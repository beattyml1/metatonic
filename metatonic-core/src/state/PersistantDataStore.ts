import {OptionalProps} from "../CoreTypes";
import {FormSchema, Schema} from "../domain/Schema/RootSchemas";

export interface PersistantDataStore {
    records<T extends {id}>(resourceName: string): RecordResource<T>;
    schema(): Promise<Schema>
}

export interface RecordResource<T extends {id}> {
    getOne(id: any): Promise<T>;
    getAll(): Promise<T[]>;
    getMany<TParams = OptionalProps<T>>(group?: string, parameters?: TParams): Promise<T[]>;
    textSearch(test: string): Promise<T[]>;
    create(data: T): Promise<T>;
    update(data: T): Promise<T>;
    delete(id: any): Promise<void>;
    schema(): Promise<FormSchema>;
}

