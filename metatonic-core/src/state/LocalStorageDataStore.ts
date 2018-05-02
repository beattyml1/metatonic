import {PersistantDataStore, RecordResource} from "./PersistantDataStore";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {OptionalProps} from "../CoreTypes";

let id = 0;

export class ObjectDataStorage implements PersistantDataStore {
    constructor(protected store) {
        if (!store.records) store.records = {};
    }

    records<T extends {id}>(resourceName: string): RecordResource<T> {
        return new ObjectStoreRecordResource<T>(this.store, resourceName);
    }

    schema(): Promise<FormSchema> {
        return Promise.resolve(this.store["$schema"]);
    }
}

export  class ObjectStoreRecordResource<T extends {id}> implements RecordResource<T> {
    constructor(protected store, protected resourceName: string) {
        if (!this.store.records[this.resourceName]) this.store.records[this.resourceName] = {};
        if (!this.store.records['$schema']) this.store.records['$schema'] = {};
    }

    getOne(id: string) {
        return Promise.resolve(this.store.records[this.resourceName][id]);
    }

    getAll() {
        return Promise.resolve((Object as any).values(this.store.records[this.resourceName]));
    }

    textSearch(test: string): Promise<T[]> {
        throw 'Not implemented'
    }

    getMany<TParams = OptionalProps<T>>(group: string, params: TParams): Promise<T[]> {
        throw 'Not implemented'
    }

    create(data: T) {
        data.id = data.id || id++;
        this.store.records[this.resourceName][data["id"]] = data;
        return Promise.resolve(data);
    }

    update(data: T) {
        this.store.records[this.resourceName][data["id"]] = data;
        return Promise.resolve(data);
    }

    delete(id: string) {
        delete this.store.records[this.resourceName][id];
        return Promise.resolve();
    }

    schema(): Promise<FormSchema> {
        return Promise.resolve(this.store.records["$schema"]);
    }
}