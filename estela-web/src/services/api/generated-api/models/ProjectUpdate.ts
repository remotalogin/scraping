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
     * Project's name.
     * @type {string}
     * @memberof ProjectUpdate
     */
    name: string;
    /**
     * Afected users.
     * @type {Array<UserDetail>}
     * @memberof ProjectUpdate
     */
    users?: Array<UserDetail>;
    /**
     * User email address.
     * @type {string}
     * @memberof ProjectUpdate
     */
    user?: string;
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
     * New permission.
     * @type {string}
     * @memberof ProjectUpdate
     */
    permission?: ProjectUpdatePermissionEnum;
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
export enum ProjectUpdatePermissionEnum {
    Admin = 'ADMIN',
    Developer = 'DEVELOPER',
    Viewer = 'VIEWER'
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
        'name': json['name'],
        'users': !exists(json, 'users') ? undefined : ((json['users'] as Array<any>).map(UserDetailFromJSON)),
        'user': !exists(json, 'user') ? undefined : json['user'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'action': !exists(json, 'action') ? undefined : json['action'],
        'permission': !exists(json, 'permission') ? undefined : json['permission'],
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
        'user': value.user,
        'email': value.email,
        'action': value.action,
        'permission': value.permission,
    };
}


