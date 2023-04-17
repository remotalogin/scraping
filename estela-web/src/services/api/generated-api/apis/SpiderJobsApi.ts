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


import * as runtime from '../runtime';
import {
    DeleteJobData,
    DeleteJobDataFromJSON,
    DeleteJobDataToJSON,
    InlineResponse2005,
    InlineResponse2005FromJSON,
    InlineResponse2005ToJSON,
    InlineResponse2006,
    InlineResponse2006FromJSON,
    InlineResponse2006ToJSON,
    SpiderJob,
    SpiderJobFromJSON,
    SpiderJobToJSON,
    SpiderJobCreate,
    SpiderJobCreateFromJSON,
    SpiderJobCreateToJSON,
    SpiderJobUpdate,
    SpiderJobUpdateFromJSON,
    SpiderJobUpdateToJSON,
} from '../models';

export interface ApiProjectsSpidersJobsCreateRequest {
    pid: string;
    sid: string;
    data: SpiderJobCreate;
    async?: boolean;
}

export interface ApiProjectsSpidersJobsDataDeleteRequest {
    jid: string;
    pid: string;
    sid: string;
    type: string;
}

export interface ApiProjectsSpidersJobsDataListRequest {
    jid: string;
    pid: string;
    sid: string;
    page?: number;
    pageSize?: number;
    type?: string;
}

export interface ApiProjectsSpidersJobsListRequest {
    pid: string;
    sid: string;
    cronjob?: number;
    status?: string;
    tag?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiProjectsSpidersJobsPartialUpdateRequest {
    jid: number;
    pid: string;
    sid: string;
    data: SpiderJob;
}

export interface ApiProjectsSpidersJobsReadRequest {
    jid: number;
    pid: string;
    sid: string;
}

export interface ApiProjectsSpidersJobsUpdateRequest {
    jid: number;
    pid: string;
    sid: string;
    data: SpiderJobUpdate;
}

/**
 * 
 */
export class SpiderJobsApi extends runtime.BaseAPI {

    /**
     */
    async apiProjectsSpidersJobsCreateRaw(requestParameters: ApiProjectsSpidersJobsCreateRequest): Promise<runtime.ApiResponse<SpiderJobCreate>> {
        if (requestParameters.pid === null || requestParameters.pid === undefined) {
            throw new runtime.RequiredError('pid','Required parameter requestParameters.pid was null or undefined when calling apiProjectsSpidersJobsCreate.');
        }

        if (requestParameters.sid === null || requestParameters.sid === undefined) {
            throw new runtime.RequiredError('sid','Required parameter requestParameters.sid was null or undefined when calling apiProjectsSpidersJobsCreate.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling apiProjectsSpidersJobsCreate.');
        }

        const queryParameters: any = {};

        if (requestParameters.async !== undefined) {
            queryParameters['async'] = requestParameters.async;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/projects/{pid}/spiders/{sid}/jobs`.replace(`{${"pid"}}`, encodeURIComponent(String(requestParameters.pid))).replace(`{${"sid"}}`, encodeURIComponent(String(requestParameters.sid))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SpiderJobCreateToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SpiderJobCreateFromJSON(jsonValue));
    }

    /**
     */
    async apiProjectsSpidersJobsCreate(requestParameters: ApiProjectsSpidersJobsCreateRequest): Promise<SpiderJobCreate> {
        const response = await this.apiProjectsSpidersJobsCreateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async apiProjectsSpidersJobsDataDeleteRaw(requestParameters: ApiProjectsSpidersJobsDataDeleteRequest): Promise<runtime.ApiResponse<DeleteJobData>> {
        if (requestParameters.jid === null || requestParameters.jid === undefined) {
            throw new runtime.RequiredError('jid','Required parameter requestParameters.jid was null or undefined when calling apiProjectsSpidersJobsDataDelete.');
        }

        if (requestParameters.pid === null || requestParameters.pid === undefined) {
            throw new runtime.RequiredError('pid','Required parameter requestParameters.pid was null or undefined when calling apiProjectsSpidersJobsDataDelete.');
        }

        if (requestParameters.sid === null || requestParameters.sid === undefined) {
            throw new runtime.RequiredError('sid','Required parameter requestParameters.sid was null or undefined when calling apiProjectsSpidersJobsDataDelete.');
        }

        if (requestParameters.type === null || requestParameters.type === undefined) {
            throw new runtime.RequiredError('type','Required parameter requestParameters.type was null or undefined when calling apiProjectsSpidersJobsDataDelete.');
        }

        const queryParameters: any = {};

        if (requestParameters.type !== undefined) {
            queryParameters['type'] = requestParameters.type;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/projects/{pid}/spiders/{sid}/jobs/{jid}/data/delete`.replace(`{${"jid"}}`, encodeURIComponent(String(requestParameters.jid))).replace(`{${"pid"}}`, encodeURIComponent(String(requestParameters.pid))).replace(`{${"sid"}}`, encodeURIComponent(String(requestParameters.sid))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeleteJobDataFromJSON(jsonValue));
    }

    /**
     */
    async apiProjectsSpidersJobsDataDelete(requestParameters: ApiProjectsSpidersJobsDataDeleteRequest): Promise<DeleteJobData> {
        const response = await this.apiProjectsSpidersJobsDataDeleteRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async apiProjectsSpidersJobsDataListRaw(requestParameters: ApiProjectsSpidersJobsDataListRequest): Promise<runtime.ApiResponse<InlineResponse2006>> {
        if (requestParameters.jid === null || requestParameters.jid === undefined) {
            throw new runtime.RequiredError('jid','Required parameter requestParameters.jid was null or undefined when calling apiProjectsSpidersJobsDataList.');
        }

        if (requestParameters.pid === null || requestParameters.pid === undefined) {
            throw new runtime.RequiredError('pid','Required parameter requestParameters.pid was null or undefined when calling apiProjectsSpidersJobsDataList.');
        }

        if (requestParameters.sid === null || requestParameters.sid === undefined) {
            throw new runtime.RequiredError('sid','Required parameter requestParameters.sid was null or undefined when calling apiProjectsSpidersJobsDataList.');
        }

        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['page_size'] = requestParameters.pageSize;
        }

        if (requestParameters.type !== undefined) {
            queryParameters['type'] = requestParameters.type;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/projects/{pid}/spiders/{sid}/jobs/{jid}/data`.replace(`{${"jid"}}`, encodeURIComponent(String(requestParameters.jid))).replace(`{${"pid"}}`, encodeURIComponent(String(requestParameters.pid))).replace(`{${"sid"}}`, encodeURIComponent(String(requestParameters.sid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2006FromJSON(jsonValue));
    }

    /**
     */
    async apiProjectsSpidersJobsDataList(requestParameters: ApiProjectsSpidersJobsDataListRequest): Promise<InlineResponse2006> {
        const response = await this.apiProjectsSpidersJobsDataListRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async apiProjectsSpidersJobsListRaw(requestParameters: ApiProjectsSpidersJobsListRequest): Promise<runtime.ApiResponse<InlineResponse2005>> {
        if (requestParameters.pid === null || requestParameters.pid === undefined) {
            throw new runtime.RequiredError('pid','Required parameter requestParameters.pid was null or undefined when calling apiProjectsSpidersJobsList.');
        }

        if (requestParameters.sid === null || requestParameters.sid === undefined) {
            throw new runtime.RequiredError('sid','Required parameter requestParameters.sid was null or undefined when calling apiProjectsSpidersJobsList.');
        }

        const queryParameters: any = {};

        if (requestParameters.cronjob !== undefined) {
            queryParameters['cronjob'] = requestParameters.cronjob;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.tag !== undefined) {
            queryParameters['tag'] = requestParameters.tag;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['page_size'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/projects/{pid}/spiders/{sid}/jobs`.replace(`{${"pid"}}`, encodeURIComponent(String(requestParameters.pid))).replace(`{${"sid"}}`, encodeURIComponent(String(requestParameters.sid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2005FromJSON(jsonValue));
    }

    /**
     */
    async apiProjectsSpidersJobsList(requestParameters: ApiProjectsSpidersJobsListRequest): Promise<InlineResponse2005> {
        const response = await this.apiProjectsSpidersJobsListRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async apiProjectsSpidersJobsPartialUpdateRaw(requestParameters: ApiProjectsSpidersJobsPartialUpdateRequest): Promise<runtime.ApiResponse<SpiderJob>> {
        if (requestParameters.jid === null || requestParameters.jid === undefined) {
            throw new runtime.RequiredError('jid','Required parameter requestParameters.jid was null or undefined when calling apiProjectsSpidersJobsPartialUpdate.');
        }

        if (requestParameters.pid === null || requestParameters.pid === undefined) {
            throw new runtime.RequiredError('pid','Required parameter requestParameters.pid was null or undefined when calling apiProjectsSpidersJobsPartialUpdate.');
        }

        if (requestParameters.sid === null || requestParameters.sid === undefined) {
            throw new runtime.RequiredError('sid','Required parameter requestParameters.sid was null or undefined when calling apiProjectsSpidersJobsPartialUpdate.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling apiProjectsSpidersJobsPartialUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/projects/{pid}/spiders/{sid}/jobs/{jid}`.replace(`{${"jid"}}`, encodeURIComponent(String(requestParameters.jid))).replace(`{${"pid"}}`, encodeURIComponent(String(requestParameters.pid))).replace(`{${"sid"}}`, encodeURIComponent(String(requestParameters.sid))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: SpiderJobToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SpiderJobFromJSON(jsonValue));
    }

    /**
     */
    async apiProjectsSpidersJobsPartialUpdate(requestParameters: ApiProjectsSpidersJobsPartialUpdateRequest): Promise<SpiderJob> {
        const response = await this.apiProjectsSpidersJobsPartialUpdateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async apiProjectsSpidersJobsReadRaw(requestParameters: ApiProjectsSpidersJobsReadRequest): Promise<runtime.ApiResponse<SpiderJob>> {
        if (requestParameters.jid === null || requestParameters.jid === undefined) {
            throw new runtime.RequiredError('jid','Required parameter requestParameters.jid was null or undefined when calling apiProjectsSpidersJobsRead.');
        }

        if (requestParameters.pid === null || requestParameters.pid === undefined) {
            throw new runtime.RequiredError('pid','Required parameter requestParameters.pid was null or undefined when calling apiProjectsSpidersJobsRead.');
        }

        if (requestParameters.sid === null || requestParameters.sid === undefined) {
            throw new runtime.RequiredError('sid','Required parameter requestParameters.sid was null or undefined when calling apiProjectsSpidersJobsRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/projects/{pid}/spiders/{sid}/jobs/{jid}`.replace(`{${"jid"}}`, encodeURIComponent(String(requestParameters.jid))).replace(`{${"pid"}}`, encodeURIComponent(String(requestParameters.pid))).replace(`{${"sid"}}`, encodeURIComponent(String(requestParameters.sid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SpiderJobFromJSON(jsonValue));
    }

    /**
     */
    async apiProjectsSpidersJobsRead(requestParameters: ApiProjectsSpidersJobsReadRequest): Promise<SpiderJob> {
        const response = await this.apiProjectsSpidersJobsReadRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async apiProjectsSpidersJobsUpdateRaw(requestParameters: ApiProjectsSpidersJobsUpdateRequest): Promise<runtime.ApiResponse<SpiderJobUpdate>> {
        if (requestParameters.jid === null || requestParameters.jid === undefined) {
            throw new runtime.RequiredError('jid','Required parameter requestParameters.jid was null or undefined when calling apiProjectsSpidersJobsUpdate.');
        }

        if (requestParameters.pid === null || requestParameters.pid === undefined) {
            throw new runtime.RequiredError('pid','Required parameter requestParameters.pid was null or undefined when calling apiProjectsSpidersJobsUpdate.');
        }

        if (requestParameters.sid === null || requestParameters.sid === undefined) {
            throw new runtime.RequiredError('sid','Required parameter requestParameters.sid was null or undefined when calling apiProjectsSpidersJobsUpdate.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling apiProjectsSpidersJobsUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/projects/{pid}/spiders/{sid}/jobs/{jid}`.replace(`{${"jid"}}`, encodeURIComponent(String(requestParameters.jid))).replace(`{${"pid"}}`, encodeURIComponent(String(requestParameters.pid))).replace(`{${"sid"}}`, encodeURIComponent(String(requestParameters.sid))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SpiderJobUpdateToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SpiderJobUpdateFromJSON(jsonValue));
    }

    /**
     */
    async apiProjectsSpidersJobsUpdate(requestParameters: ApiProjectsSpidersJobsUpdateRequest): Promise<SpiderJobUpdate> {
        const response = await this.apiProjectsSpidersJobsUpdateRaw(requestParameters);
        return await response.value();
    }

}
