import {SchemaField} from "../domain/Schema/Records";

export interface ValueDataTypeConstructor {
    fromData(stringValue: string, field?: SchemaField): ValueDataType;
    fromEditor(stringValue: string, field?: SchemaField): ValueDataType;
}

export interface ValueDataType {
    toDataString(): string;
    toDisplayString(): string;
    toEditorString(): string;
    format(formatString?: string): string;
}

export interface RecordDataType<T>{
    new (jsonData: T, field: SchemaField);
}

