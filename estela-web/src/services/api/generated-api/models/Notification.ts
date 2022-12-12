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
/**
 * 
 * @export
 * @interface Notification
 */
export interface Notification {
    /**
     * A unique integer value identifying each notification
     * @type {number}
     * @memberof Notification
     */
    readonly nid?: number;
    /**
     * Notifications message.
     * @type {string}
     * @memberof Notification
     */
    message: string;
    /**
     * User whose this notification belongs to.
     * @type {number}
     * @memberof Notification
     */
    user: number;
    /**
     * The direction where the notification will redirect.
     * @type {string}
     * @memberof Notification
     */
    redirectto: string;
    /**
     * Whether the notification was seen.
     * @type {boolean}
     * @memberof Notification
     */
    seen?: boolean;
    /**
     * Notification send date.
     * @type {Date}
     * @memberof Notification
     */
    readonly createdAt?: Date;
}

export function NotificationFromJSON(json: any): Notification {
    return NotificationFromJSONTyped(json, false);
}

export function NotificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Notification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nid': !exists(json, 'nid') ? undefined : json['nid'],
        'message': json['message'],
        'user': json['user'],
        'redirectto': json['redirectto'],
        'seen': !exists(json, 'seen') ? undefined : json['seen'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
    };
}

export function NotificationToJSON(value?: Notification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'user': value.user,
        'redirectto': value.redirectto,
        'seen': value.seen,
    };
}

