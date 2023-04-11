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
    Activity,
    ActivityFromJSON,
    ActivityFromJSONTyped,
    ActivityToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProjectActivity
 */
export interface ProjectActivity {
    /**
     * Project Activities.
     * @type {Array<Activity>}
     * @memberof ProjectActivity
     */
    results: Array<Activity>;
    /**
     * Project cronjobs count.
     * @type {number}
     * @memberof ProjectActivity
     */
    count: number;
}

export function ProjectActivityFromJSON(json: any): ProjectActivity {
    return ProjectActivityFromJSONTyped(json, false);
}

export function ProjectActivityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectActivity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'results': ((json['results'] as Array<any>).map(ActivityFromJSON)),
        'count': json['count'],
    };
}

export function ProjectActivityToJSON(value?: ProjectActivity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'results': ((value.results as Array<any>).map(ActivityToJSON)),
        'count': value.count,
    };
}


