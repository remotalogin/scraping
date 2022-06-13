/* tslint:disable */
/* eslint-disable */
/**
 * Bitmaker API v1.0 Documentation
 * Bitmaker API Swagger Specification
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ProjectUsage
 */
export interface ProjectUsage {
    /**
     * 
     * @type {string}
     * @memberof ProjectUsage
     */
    readonly pid?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectUsage
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectUsage
     */
    readonly networkUsage?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectUsage
     */
    readonly processingTime?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectUsage
     */
    readonly itemsStorageSize?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectUsage
     */
    readonly requestsStorageSize?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectUsage
     */
    readonly logsStorageSize?: string;
}

export function ProjectUsageFromJSON(json: any): ProjectUsage {
    return ProjectUsageFromJSONTyped(json, false);
}

export function ProjectUsageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectUsage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pid': !exists(json, 'pid') ? undefined : json['pid'],
        'name': json['name'],
        'networkUsage': !exists(json, 'network_usage') ? undefined : json['network_usage'],
        'processingTime': !exists(json, 'processing_time') ? undefined : json['processing_time'],
        'itemsStorageSize': !exists(json, 'items_storage_size') ? undefined : json['items_storage_size'],
        'requestsStorageSize': !exists(json, 'requests_storage_size') ? undefined : json['requests_storage_size'],
        'logsStorageSize': !exists(json, 'logs_storage_size') ? undefined : json['logs_storage_size'],
    };
}

export function ProjectUsageToJSON(value?: ProjectUsage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}

