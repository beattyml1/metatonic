import {OptionalProps} from "../CoreTypes";
import {FormSchema} from "../domain/Schema/RootSchemas";

export interface PersistantDataStore {
    records<T extends {id}>(resourceName: string): RecordResource<T>
}

export interface RecordResource<T extends {id}> {
    getOne(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    textSearch(test: string): Promise<T[]>;
    parametricSearch<TParams = OptionalProps<T>>(params: TParams): Promise<T[]>;
    create(data: T);
    update(data: T);
    delete(id: string);
    schema(): Promise<FormSchema>;
}

