import {PersistantDataStore, RecordResource} from "./PersistantDataStore";

export class ObjectDataStorage implements PersistantDataStore {
    constructor(protected store) {

    }

    records<T>(resourceName: string): RecordResource {
        return new ObjectStoreRecordResource(this.store, resourceName);
    }

}

export  class ObjectStoreRecordResource implements RecordResource {
    constructor(protected store, protected resourceName: string) {

    }

    getOne(id: string): T {
        return Promise.resolve(store.records[this.resourceName][id]);
    }

    getAll(): T[] {
        return Promise.resolve(Object.values(store.records[this.resourceName]));
    }

    textSearch(test: string) {
        throw 'Not implemented'
    }

    parametricSearch<TParams>(params: TParams) {
        throw 'Not implemented'
    }

    create(data: T) {
        store.records[this.resourceName][data["id"]] = data;
    }

    update(data: T) {
        store.records[this.resourceName][data["id"]] = data;
    }

    delete(id: string) {
        delete store.records[this.resourceName][data["id"]];
    }

}