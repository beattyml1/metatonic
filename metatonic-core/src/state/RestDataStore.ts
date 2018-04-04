import {PersistantDataStore, RecordResource} from "./PersistantDataStore";
import {Rest} from "../services/Rest";
import {FormSchema} from "../domain/Schema/RootSchemas";
export class RestDataStore implements PersistantDataStore {
    constructor(protected metaTonicApiUrl: string){}
    records<T extends {id}>(resourceName: string) {
        return new RestRecordResource<T>(this.metaTonicApiUrl, resourceName)
    }
    schema(): Promise<FormSchema> {
        return Rest.Get<FormSchema, any>(`${this.metaTonicApiUrl}/$global-schema`);
    }
}

export class RestRecordResource<T extends {id}> implements RecordResource<T> {

    constructor(protected metaTonicApiUrl: string, protected recordName: string) {

    }

    getOne(id: string): Promise<T> {
        return Rest.Get<T, any>(`${this.metaTonicApiUrl}/records/${this.recordName}/${id}`);
    }

    getAll(): Promise<T[]>  {
        return Rest.Get<T[], any>(`${this.metaTonicApiUrl}/records/${this.recordName}`);
    }

    textSearch(text: string) {
        return Rest.Get<T[], any>(`${this.metaTonicApiUrl}/records/${this.recordName}`, { $textSearch: text });
    }

    parametricSearch<TParams>(params: TParams) {
        return Rest.Get<T[], any>(`${this.metaTonicApiUrl}/records/${this.recordName}`, params);
    }

    create(data: T) {
        return Rest.Post<T, any>(`${this.metaTonicApiUrl}/records/${this.recordName}`, data);
    }

    update(data: T) {
        return Rest.Put<T, any>(`${this.metaTonicApiUrl}/records/${this.recordName}/${data.id}`, data);
    }

    delete(id: string) {
        return Rest.Delete<T>(`${this.metaTonicApiUrl}/records/${this.recordName}/${id}`);
    }

    schema(): Promise<FormSchema> {
        return Rest.Get<FormSchema, any>(`${this.metaTonicApiUrl}/records/${this.recordName}/$form-schema`);
    }

}