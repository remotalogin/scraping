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
 * @interface DeleteJobData
 */
export interface DeleteJobData {
    /**
     * 
     * @type {number}
     * @memberof DeleteJobData
     */
    count: number;
}

export function DeleteJobDataFromJSON(json: any): DeleteJobData {
    return DeleteJobDataFromJSONTyped(json, false);
}

export function DeleteJobDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeleteJobData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': json['count'],
    };
}

export function DeleteJobDataToJSON(value?: DeleteJobData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
    };
}


