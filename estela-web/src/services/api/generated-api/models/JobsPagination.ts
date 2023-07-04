/* tslint:disable */
/* eslint-disable */
/**
 * estela API v1.0 Documentation
 * estela API Swagger Specification
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
 * @interface JobsPagination
 */
export interface JobsPagination {
    /**
     * 
     * @type {number}
     * @memberof JobsPagination
     */
    count: number;
    /**
     * 
     * @type {string}
     * @memberof JobsPagination
     */
    readonly next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof JobsPagination
     */
    readonly previous?: string | null;
    /**
     * 
     * @type {Array<SpiderJob>}
     * @memberof JobsPagination
     */
    results: Array<SpiderJob>;
}

export function JobsPaginationFromJSON(json: any): JobsPagination {
    return JobsPaginationFromJSONTyped(json, false);
}

export function JobsPaginationFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobsPagination {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': ((json['results'] as Array<any>).map(SpiderJobFromJSON)),
    };
}

export function JobsPaginationToJSON(value?: JobsPagination | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'results': ((value.results as Array<any>).map(SpiderJobToJSON)),
    };
}


