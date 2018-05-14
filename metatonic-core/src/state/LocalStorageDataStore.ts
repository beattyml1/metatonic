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
    }

    getOne(id: string) {
        return Promise.resolve(this.store.records[this.resourceName][id]||null);
    }

    getAll() {

        return Promise.resolve((Object as any).entries(this.store.records[this.resourceName]).filter(e => e[0] !== '$schema').map(e=>e[1]));
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
        let globalSchema = this.store['$schema']||{};
        let globalTypes = globalSchema.types || {};
        let resourceSchema = globalTypes[this.resourceName] || {};
        return Promise.resolve(globalSchema);
    }
}