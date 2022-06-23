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
    Spider,
    SpiderFromJSON,
    SpiderFromJSONTyped,
    SpiderToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2002
 */
export interface InlineResponse2002 {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2002
     */
    count: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2002
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2002
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<Spider>}
     * @memberof InlineResponse2002
     */
    results: Array<Spider>;
}

export function InlineResponse2002FromJSON(json: any): InlineResponse2002 {
    return InlineResponse2002FromJSONTyped(json, false);
}

export function InlineResponse2002FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2002 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': ((json['results'] as Array<any>).map(SpiderFromJSON)),
    };
}

export function InlineResponse2002ToJSON(value?: InlineResponse2002 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'next': value.next,
        'previous': value.previous,
        'results': ((value.results as Array<any>).map(SpiderToJSON)),
    };
}


