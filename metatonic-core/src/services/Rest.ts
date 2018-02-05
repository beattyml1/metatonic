import {Maybe, Nothing} from "CoreTypes";
export type IdTypes = string|number;
export type IdRequest<TId extends IdTypes> = { id?: Maybe<TId> };
export type QueryRequest<TQuery> = {  query?: Maybe<TQuery> };
export type ActionRequest = {  action?: Maybe<string>; };

export interface RestfulClient {
	Get<TResult, TQuery, TId extends IdTypes>(
		resourceUrl: string,
		requestParams?: IdRequest<TId> & QueryRequest<TQuery> & ActionRequest): Promise<TResult>
	Post<TResult, TData, TId extends IdTypes>(
		resourceUrl: string,
		data: string,
		requestParams?: IdRequest<TId> & ActionRequest): Promise<TResult>
	Put<TResult, TData, TId extends IdTypes>(
		resourceUrl: string,
		data: string,
		requestParams?: IdRequest<TId> & ActionRequest): Promise<TResult>
	Delete<TResult, TData, TId extends IdTypes>(
		resourceUrl: string,
		requestParams: IdRequest<TId> & ActionRequest): Promise<TResult>;
}

export class RestClient {
    async Get<TResult, TQuery, TId extends IdTypes>(
        resourceUrl: string,
        requestParams?: IdRequest<TId> & QueryRequest<TQuery> & ActionRequest): Promise<TResult> {
        return this.makeRequest("GET", resourceUrl);
	}
    async Post<TResult, TData, TId extends IdTypes>(
        resourceUrl: string,
        data: string,
        requestParams?: IdRequest<TId> & ActionRequest): Promise<TResult> {
        return this.makeRequest("POST", resourceUrl, data);
	}

    async Put<TResult, TData, TId extends IdTypes>(
        resourceUrl: string,
        data: string,
        requestParams?: IdRequest<TId> & ActionRequest): Promise<TResult> {
        return this.makeRequest("PUT", resourceUrl, data);
	}
    async Delete<TResult, TData, TId extends IdTypes>(
        resourceUrl: string,
        requestParams: IdRequest<TId> & ActionRequest): Promise<TResult> {
        return this.makeRequest("DELETE", resourceUrl);
	}

	private makeRequest (method, url, data?) {
        return new Promise<any>(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.open(method, url);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send(data === undefined ? undefined : JSON.stringify(data));
        });
    }
}

export const Rest = new RestClient();