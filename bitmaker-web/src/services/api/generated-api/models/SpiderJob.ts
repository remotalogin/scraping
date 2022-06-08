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
    SpiderJobArg,
    SpiderJobArgFromJSON,
    SpiderJobArgFromJSONTyped,
    SpiderJobArgToJSON,
    SpiderJobEnvVar,
    SpiderJobEnvVarFromJSON,
    SpiderJobEnvVarFromJSONTyped,
    SpiderJobEnvVarToJSON,
    SpiderJobTag,
    SpiderJobTagFromJSON,
    SpiderJobTagFromJSONTyped,
    SpiderJobTagToJSON,
} from './';

/**
 * 
 * @export
 * @interface SpiderJob
 */
export interface SpiderJob {
    /**
     * 
     * @type {number}
     * @memberof SpiderJob
     */
    readonly jid?: number;
    /**
     * 
     * @type {number}
     * @memberof SpiderJob
     */
    spider: number;
    /**
     * 
     * @type {Date}
     * @memberof SpiderJob
     */
    readonly created?: Date;
    /**
     * 
     * @type {string}
     * @memberof SpiderJob
     */
    readonly name?: string;
    /**
     * 
     * @type {number}
     * @memberof SpiderJob
     */
    lifespan?: number;
    /**
     * 
     * @type {number}
     * @memberof SpiderJob
     */
    totalResponseBytes?: number;
    /**
     * 
     * @type {Array<SpiderJobArg>}
     * @memberof SpiderJob
     */
    args?: Array<SpiderJobArg>;
    /**
     * 
     * @type {Array<SpiderJobEnvVar>}
     * @memberof SpiderJob
     */
    envVars?: Array<SpiderJobEnvVar>;
    /**
     * 
     * @type {Array<SpiderJobTag>}
     * @memberof SpiderJob
     */
    tags?: Array<SpiderJobTag>;
    /**
     * 
     * @type {string}
     * @memberof SpiderJob
     */
    readonly jobStatus?: string;
    /**
     * 
     * @type {number}
     * @memberof SpiderJob
     */
    cronjob?: number | null;
}

export function SpiderJobFromJSON(json: any): SpiderJob {
    return SpiderJobFromJSONTyped(json, false);
}

export function SpiderJobFromJSONTyped(json: any, ignoreDiscriminator: boolean): SpiderJob {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'jid': !exists(json, 'jid') ? undefined : json['jid'],
        'spider': json['spider'],
        'created': !exists(json, 'created') ? undefined : (new Date(json['created'])),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'lifespan': !exists(json, 'lifespan') ? undefined : json['lifespan'],
        'totalResponseBytes': !exists(json, 'total_response_bytes') ? undefined : json['total_response_bytes'],
        'args': !exists(json, 'args') ? undefined : ((json['args'] as Array<any>).map(SpiderJobArgFromJSON)),
        'envVars': !exists(json, 'env_vars') ? undefined : ((json['env_vars'] as Array<any>).map(SpiderJobEnvVarFromJSON)),
        'tags': !exists(json, 'tags') ? undefined : ((json['tags'] as Array<any>).map(SpiderJobTagFromJSON)),
        'jobStatus': !exists(json, 'job_status') ? undefined : json['job_status'],
        'cronjob': !exists(json, 'cronjob') ? undefined : json['cronjob'],
    };
}

export function SpiderJobToJSON(value?: SpiderJob | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'spider': value.spider,
        'lifespan': value.lifespan,
        'total_response_bytes': value.totalResponseBytes,
        'args': value.args === undefined ? undefined : ((value.args as Array<any>).map(SpiderJobArgToJSON)),
        'env_vars': value.envVars === undefined ? undefined : ((value.envVars as Array<any>).map(SpiderJobEnvVarToJSON)),
        'tags': value.tags === undefined ? undefined : ((value.tags as Array<any>).map(SpiderJobTagToJSON)),
        'cronjob': value.cronjob,
    };
}


