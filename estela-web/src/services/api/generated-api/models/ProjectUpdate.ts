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
    SpiderJobEnvVar,
    SpiderJobEnvVarFromJSON,
    SpiderJobEnvVarFromJSONTyped,
    SpiderJobEnvVarToJSON,
    UserDetail,
    UserDetailFromJSON,
    UserDetailFromJSONTyped,
    UserDetailToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProjectUpdate
 */
export interface ProjectUpdate {
    /**
     * A UUID identifying this project.
     * @type {string}
     * @memberof ProjectUpdate
     */
    readonly pid?: string;
    /**
     * Project name.
     * @type {string}
     * @memberof ProjectUpdate
     */
    name?: string;
    /**
     * Affected users.
     * @type {Array<UserDetail>}
     * @memberof ProjectUpdate
     */
    users?: Array<UserDetail>;
    /**
     * Email address.
     * @type {string}
     * @memberof ProjectUpdate
     */
    email?: string;
    /**
     * Performed action.
     * @type {string}
     * @memberof ProjectUpdate
     */
    action?: ProjectUpdateActionEnum;
    /**
     * Set project framework.
     * @type {string}
     * @memberof ProjectUpdate
     */
    framework?: ProjectUpdateFrameworkEnum;
    /**
     * Project env variables.
     * @type {Array<SpiderJobEnvVar>}
     * @memberof ProjectUpdate
     */
    envVars?: Array<SpiderJobEnvVar>;
    /**
     * New permission.
     * @type {string}
     * @memberof ProjectUpdate
     */
    permission?: ProjectUpdatePermissionEnum;
    /**
     * New data status.
     * @type {string}
     * @memberof ProjectUpdate
     */
    dataStatus?: ProjectUpdateDataStatusEnum;
    /**
     * New data expiry days.
     * @type {number}
     * @memberof ProjectUpdate
     */
    dataExpiryDays?: number;
}

/**
* @export
* @enum {string}
*/
export enum ProjectUpdateActionEnum {
    Remove = 'remove',
    Add = 'add',
    Update = 'update'
}/**
* @export
* @enum {string}
*/
export enum ProjectUpdateFrameworkEnum {
    Scrapy = 'SCRAPY',
    Requests = 'REQUESTS'
}/**
* @export
* @enum {string}
*/
export enum ProjectUpdatePermissionEnum {
    Admin = 'ADMIN',
    Developer = 'DEVELOPER',
    Viewer = 'VIEWER'
}/**
* @export
* @enum {string}
*/
export enum ProjectUpdateDataStatusEnum {
    Persistent = 'PERSISTENT',
    Pending = 'PENDING'
}

export function ProjectUpdateFromJSON(json: any): ProjectUpdate {
    return ProjectUpdateFromJSONTyped(json, false);
}

export function ProjectUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectUpdate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pid': !exists(json, 'pid') ? undefined : json['pid'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'users': !exists(json, 'users') ? undefined : ((json['users'] as Array<any>).map(UserDetailFromJSON)),
        'email': !exists(json, 'email') ? undefined : json['email'],
        'action': !exists(json, 'action') ? undefined : json['action'],
        'framework': !exists(json, 'framework') ? undefined : json['framework'],
        'envVars': !exists(json, 'env_vars') ? undefined : ((json['env_vars'] as Array<any>).map(SpiderJobEnvVarFromJSON)),
        'permission': !exists(json, 'permission') ? undefined : json['permission'],
        'dataStatus': !exists(json, 'data_status') ? undefined : json['data_status'],
        'dataExpiryDays': !exists(json, 'data_expiry_days') ? undefined : json['data_expiry_days'],
    };
}

export function ProjectUpdateToJSON(value?: ProjectUpdate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'users': value.users === undefined ? undefined : ((value.users as Array<any>).map(UserDetailToJSON)),
        'email': value.email,
        'action': value.action,
        'framework': value.framework,
        'env_vars': value.envVars === undefined ? undefined : ((value.envVars as Array<any>).map(SpiderJobEnvVarToJSON)),
        'permission': value.permission,
        'data_status': value.dataStatus,
        'data_expiry_days': value.dataExpiryDays,
    };
}


