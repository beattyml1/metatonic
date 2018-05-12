import {Maybe} from "../CoreTypes";
import * as Http from "./Http";
import * as QueryString from "./QueryStringEncoding";

export type IdTypes = string|number;
export type IdRequest<TId extends IdTypes> = { id?: Maybe<TId> };
export type QueryRequest<TQuery> = {  query?: Maybe<TQuery> };
export type ActionRequest = {  action?: Maybe<string>; };

export class RestClient {
    async Get<TResult, TQuery={}>(
        resourceUrl: string,
        query?: TQuery): Promise<TResult> {
        return Http.makeRequest("GET", query ? `${resourceUrl}?${QueryString.encode(query)}` : resourceUrl);
	}
    async Post<TResult, TData=void>(
        resourceUrl: string,
        data?: TData): Promise<TResult> {
        return Http.makeRequest("POST", resourceUrl, data);
	}

    async Put<TResult, TData=void>(
        resourceUrl: string,
        data?: TData): Promise<TResult> {
        return Http.makeRequest("PUT", resourceUrl, data);
	}
    async Delete(resourceUrl): Promise<void> {
        return Http.makeRequest("DELETE", resourceUrl);
	}
}

export const Rest = new RestClient();