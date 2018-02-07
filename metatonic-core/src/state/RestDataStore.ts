import {PersistantDataStore, RecordResource} from "./PersistantDataStore";
import {Rest} from "services/Rest";
export class RestDataStore implements PersistantDataStore {
    constructor(protected metaTonicApiUrl: string);
    records<T>(resourceName: string) {
        return new RestRecordResource(this.metaTonicApiUrl, resourceName)
    }

}

export class RestRecordResource implements RecordResource {
    constructor(protected metaTonicApiUrl: string, protected recordName: string) {

    }

    getOne(id: string): T {
        return Rest.Get(`${this.metaTonicApiUrl}/records/${this.recordName}/${id}`);
    }

    getAll(): T[] {
        return Rest.Get(`${this.metaTonicApiUrl}/records/${this.recordName}`);
    }

    textSearch(text: string) {
        return Rest.Get(`${this.metaTonicApiUrl}/records/${this.recordName}`, { $textSearch: text });
    }

    parametricSearch<TParams>(params: TParams) {
        return Rest.Get(`${this.metaTonicApiUrl}/records/${this.recordName}`, params);
    }

    create(data: T) {
        return Rest.Post(`${this.metaTonicApiUrl}/records/${this.recordName}`, params);
    }

    update(ata: T) {
        return Rest.Put(`${this.metaTonicApiUrl}/records/${this.recordName}/${data.id}`, params);
    }

    delete(id: string) {
        return Rest.Delete(`${this.metaTonicApiUrl}/records/${this.recordName}/${id}`);
    }

}