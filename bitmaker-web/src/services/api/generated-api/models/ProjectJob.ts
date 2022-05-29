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
import {
    SpiderJob,
    SpiderJobFromJSON,
    SpiderJobFromJSONTyped,
    SpiderJobToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProjectJob
 */
export interface ProjectJob {
    /**
     * 
     * @type {Array<SpiderJob>}
     * @memberof ProjectJob
     */
    results: Array<SpiderJob>;
    /**
     * 
     * @type {number}
     * @memberof ProjectJob
     */
    count: number;
}

export function ProjectJobFromJSON(json: any): ProjectJob {
    return ProjectJobFromJSONTyped(json, false);
}

export function ProjectJobFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectJob {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'results': ((json['results'] as Array<any>).map(SpiderJobFromJSON)),
        'count': json['count'],
    };
}

export function ProjectJobToJSON(value?: ProjectJob | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'results': ((value.results as Array<any>).map(SpiderJobToJSON)),
        'count': value.count,
    };
}


