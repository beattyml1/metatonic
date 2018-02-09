import {PersistantDataStore, RecordResource} from "./PersistantDataStore";
import {FormSchema} from "../domain/Schema/RootSchemas";

export class ObjectDataStorage implements PersistantDataStore {
    constructor(protected store) {

    }

    records<T extends {id}>(resourceName: string): RecordResource<T> {
        return new ObjectStoreRecordResource<T>(this.store, resourceName);
    }

}

export  class ObjectStoreRecordResource<T extends {id}> implements RecordResource<T> {
    constructor(protected store, protected resourceName: string) {
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

    parametricSearch<TParams>(params: TParams): Promise<T[]> {
        throw 'Not implemented'
    }

    create(data: T) {
        this.store.records[this.resourceName][data["id"]] = data;
    }

    update(data: T) {
        this.store.records[this.resourceName][data["id"]] = data;
    }

    delete(id: string) {
        delete this.store.records[this.resourceName][id];
    }

    schema(): Promise<FormSchema> {
        return Promise.resolve(this.store.records["$schema"]);
    }
}