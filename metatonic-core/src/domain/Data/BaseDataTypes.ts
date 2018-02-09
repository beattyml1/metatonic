import {SchemaField} from "../Schema/Records";

export interface ValueDataTypeConstructor {
    new (stringValue: string, field?: SchemaField);
}

export interface ValueDataType {
    toDataString(): string;
    toDisplayString(): string;
    toEditorString(): string;
}

export interface RecordDataType<T>{
    new (jsonData: T, field: SchemaField);
}