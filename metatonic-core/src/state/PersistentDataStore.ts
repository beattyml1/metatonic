import {OptionalProps} from "../CoreTypes";
import {FormSchema, Schema} from "../domain/Schema/RootSchemas";
import {Unit, UnitCategory} from "../domain/Schema/Quantities";

export interface PersistentDataStore {
    records<T extends {id}>(resourceName: string): RecordResource<T>;
    schema(): Promise<Schema>;
    units(params?: { category?: string, measurementSystem?: string, group?: string }): Promise<Unit[]>;
    unit(key): Promise<Unit>;
    unitCategory(name): Promise<UnitCategory>
}

export interface RecordResource<T extends {id}> {
    getOne(id: any): Promise<T>;
    getAll(): Promise<T[]>;
    //getMany<TParams = OptionalProps<T>>(parameters?: TParams): Promise<T[]>;
    getMany<TParams = OptionalProps<T>>(group?: string, parameters?: TParams): Promise<T[]>;
    //getMany<TParams = OptionalProps<T>>(groups?: string[], parameters?: TParams): Promise<T[]>;
    textSearch(text: string): Promise<T[]>;
    create(data: T): Promise<T>;
    update(data: T): Promise<T>;
    delete(id: any): Promise<void>;
    schema(): Promise<FormSchema>;
}

