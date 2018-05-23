import {PersistentDataStore, RecordResource} from "./PersistentDataStore";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {OptionalProps} from "../CoreTypes";
import {Unit, UnitCategory} from "../domain/Schema/Quantities";
import {hasValue, isKnown} from "../extensions/hasValue";

let id = 0;

let filter = (filterVal, val) => !hasValue(filterVal) || filterVal === val;

export class ObjectDataStorage implements PersistentDataStore {
    constructor(protected store) {
        if (!store.records) store.records = {};
        if (!store.$units) store.$units = [];
        if (!store.$unitCategories) store.$unitCategories = [];
    }

    records<T extends {id}>(resourceName: string): RecordResource<T> {
        return new ObjectStoreRecordResource<T>(this.store, resourceName);
    }

    schema(): Promise<FormSchema> {
        return Promise.resolve(this.store["$schema"]);
    }

    units(params?: { category?: string; measurementSystem?: string; group?: string }): Promise<Unit[]> {
        let allUnits = this.store['$units'] as Unit[];
        return Promise.resolve(allUnits.filter(u => !params || (
            filter(params!.category, u!.category!.name) && filter(params!.measurementSystem, u!.measurementSystem!.name))));
    }

    unit(key): Promise<Unit> {
        return Promise.resolve(this.store['$units'].find(u => u.key === key));
    }

    unitCategory(name): Promise<UnitCategory> {
        return Promise.resolve(this.store['$unitCategories'].find(u => u.name === name));
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
        let allRecords = Object.values(this.store.records[this.resourceName]) as any[];
        return Promise.resolve(allRecords.filter(matchesFilter(params)));
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

let matchesFilter = (filter) => (value) => {
    return Object.keys(filter).every((key) => {
        if (!isKnown(filter[key])) return true;
        if (filter[key] === value[key]) return true;
        if (typeof value[key] === 'object') return matchesFilter(filter[key])(value[key]);
        if (typeof filter[key] === 'object') return Array.isArray(filter[key]) ? arrayFilter(filter[key])(value[key]) : rangeFilter(filter[key])(value[key]);
        return filter[key].toString() === filter[key].toString();
    })
}

let arrayFilter = (filter: any[]) => value => filter.includes(value);
let rangeFilter = (filter: {start, end}) => value => filter.start <= value && filter.end <= value