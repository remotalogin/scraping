import json
import pymongo

from abc import ABCMeta, abstractmethod
from bson.json_util import loads
from pymongo.errors import ConnectionFailure, PyMongoError


class InsertionResponse:
    def __init__(self, ok, exception=None, need_upsert=False):
        self.ok = ok
        self.need_upsert = need_upsert
        self.message = (
            "Everything good! :)" if ok else "[{}]".format(exception.__class__.__name__)
        )


class DatabaseInterface(metaclass=ABCMeta):
    @abstractmethod
    def get_connection(self):
        pass

    @abstractmethod
    def delete_collection_data(self):
        pass

    @abstractmethod
    def get_all_collection_data(self):
        pass

    @abstractmethod
    def get_paginated_collection_data(self):
        pass

    @abstractmethod
    def get_estimated_document_count(self):
        pass

    @abstractmethod
    def insert_one_to_unique_collection(self):
        pass

    @abstractmethod
    def insert_one_to_collection(self):
        pass

    @abstractmethod
    def insert_many_to_collection(self):
        pass

    @abstractmethod
    def get_database_size(self):
        pass

    @abstractmethod
    def get_collection_size(self):
        pass


class MongoAdapter(DatabaseInterface):
    def __init__(self, mongo_connection, mongo_production, mongo_certificate_path):
        self.mongo_connection = mongo_connection
        self.mongo_production = mongo_production
        self.mongo_certificate_path = mongo_certificate_path

    def get_connection(self):
        try:
            if self.mongo_production:
                client = pymongo.MongoClient(
                    self.mongo_connection,
                    tls=True,
                    tlsCAFile=self.mongo_certificate_path,
                )
                client.admin.command("ismaster")
            else:
                client = pymongo.MongoClient(self.mongo_connection)
        except ConnectionFailure:
            client = None
            return False
        self.client = client
        return True

    def delete_collection_data(self, database_name, collection_name):
        collection = self.client[database_name][collection_name]
        return collection.delete_many({}).deleted_count

    def get_all_collection_data(self, database_name, collection_name):
        collection = self.client[database_name][collection_name]
        result = collection.find()
        result = loads(json.dumps(list(result), default=str))
        return result

    def get_paginated_collection_data(
        self, database_name, collection_name, page, page_size
    ):
        self.collection = self.client[database_name][collection_name]
        result = self.collection.find().skip(page_size * (page - 1)).limit(page_size)
        result = loads(json.dumps(list(result), default=str))
        return result

    def get_estimated_document_count(self):
        return self.collection.estimated_document_count()

    def insert_one_to_unique_collection(self, database_name, collection_name, item):
        response = None
        try:
            self.client[database_name][collection_name].update_one(
                item, {"$set": item}, upsert=True
            )
            response = InsertionResponse(True)
        except PyMongoError as ex:
            response = InsertionResponse(False, ex)
        finally:
            return response

    def insert_one_to_collection(self, database_name, collection_name, item):
        response = None
        try:
            self.client[database_name][collection_name].insert_one(item)
            response = InsertionResponse(True)
        except PyMongoError as ex:
            response = InsertionResponse(False, ex)
        finally:
            return response

    def insert_many_to_collection(
        self, database_name, collection_name, items, ordered=False
    ):
        response = None
        try:
            self.client[database_name][collection_name].insert_many(
                items, ordered=ordered
            )
            response = InsertionResponse(True)
        except PyMongoError as ex:
            response = InsertionResponse(False, ex, need_upsert=True)
        finally:
            return response

    def get_database_size(self, database_name, data_type):
        database = self.client[database_name]
        collections = database.list_collection_names()
        total_size_bytes = 0
        for collection in collections:
            if data_type in collection:
                total_size_bytes += self.get_collection_size(database_name, collection)

        return total_size_bytes

    def get_collection_size(self, database_name, collection):
        database = self.client[database_name]
        collection_size = database.command("dataSize", f"{database_name}.{collection}")[
            "size"
        ]
        return collection_size


def get_database_interface(engine, connection, production, certificate_path):
    database_interfaces = {
        "mongodb": MongoAdapter(connection, production, certificate_path),
    }
    return database_interfaces[engine]
