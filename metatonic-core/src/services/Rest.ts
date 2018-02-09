import {Maybe, Nothing} from "../CoreTypes";
export type IdTypes = string|number;
export type IdRequest<TId extends IdTypes> = { id?: Maybe<TId> };
export type QueryRequest<TQuery> = {  query?: Maybe<TQuery> };
export type ActionRequest = {  action?: Maybe<string>; };

export interface RestfulClient {
	Get<TResult, TQuery=void>(
		resourceUrl: string,
		query?: TQuery): Promise<TResult>
	Post<TResult, TData=void>(
		resourceUrl: string,
		data?: TData): Promise<TResult>
	Put<TResult, TData=void>(
		resourceUrl: string,
		data?: TData): Promise<TResult>
	Delete<TResult>(
		resourceUrl: string): Promise<TResult>;
}

export class RestClient {
    async Get<TResult, TQuery=void>(
        resourceUrl: string,
        query?: TQuery): Promise<TResult> {
        return this.makeRequest("GET", query ? `${resourceUrl}?${this.encodeQueryString(query)}` : resourceUrl);
	}
    async Post<TResult, TData=void>(
        resourceUrl: string,
        data?: TData): Promise<TResult> {
        return this.makeRequest("POST", resourceUrl, data);
	}

    async Put<TResult, TData=void>(
        resourceUrl: string,
        data?: TData): Promise<TResult> {
        return this.makeRequest("PUT", resourceUrl, data);
	}
    async Delete<TResult>(resourceUrl): Promise<TResult> {
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

    encodeQueryString(obj, prefix?) {
        var str = new Array<any>(), p;
        for(p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                let isObject = v !== null && typeof v === "object"
                str.push(isObject ? this.encodeQueryString(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
            }
        }
        return str.join("&");
    }
}

export const Rest = new RestClient();