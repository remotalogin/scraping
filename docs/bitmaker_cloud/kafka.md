---
layout: page
title: Kafka
permalink: /cloud/kafka
parent: Bitmaker Cloud
---

# Bitmaker Cloud Kafka

Bitmaker Kafka contains all the configurations for the Kafka cluster on Kubernetes.
Currently, it allows upscaling and downscaling in both brokers and zookeepers.

The script [`consumer.py`](https://github.com/bitmakerla/bitmaker-cloud/blob/main/bitmaker-kafka/consumer.py)
was created to transfer items from Kafka to the database.

## Local Setup

Locally, Kafka is run as a Docker service.

If it is the first time you build the app, you need to [set up the API locally]({% link bitmaker_cloud/api/local.md %}).
Then, take the following steps inside [`bitmaker-kafka/`](https://github.com/bitmakerla/bitmaker-cloud/tree/main/bitmaker-kafka):

- Create a new file `kubernetes/bitmaker-kafka-secrets.yaml` based on `kubernetes/bitmaker-kafka-secrets.yaml.example`.
  Then, modify the file with the appropriate values:
  - **\<MONGO_CONNECTION_BASE_64\>**: An active connection to a MongoDB cluster formatted in _base64_.
  
- Check that the endpoint IP in the `bitmaker-kafka-services.yaml` file, and the
  `LISTENER_DOCKER_EXTERNAL` field in the `docker-compose.yaml` file are equal to:
  ```bash
  $ minikube ssh 'grep host.minikube.internal /etc/hosts | cut -f1'
  ```
  
- Apply the setup command, which build and upload the images, and apply all the kubernetes `yaml` files:
  ```bash
  $ make setup
  ```

### Commands

After the first setup, you can:
```bash
$ make start    # Start the Kafka service
$ make stop     # Stop the Kafka service
$ make rebuild  # Rebuild the Kafka consumer
$ make down     # Delete the Kafka service
```

## Upload Images to the Registry

```bash
$ make build-consumer-image
$ make upload-consumer-image
```

## Formatting

```bash
$ make lint
```