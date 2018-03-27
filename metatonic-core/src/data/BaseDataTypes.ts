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
    hasValue(): boolean;
}

export interface ComparableValueDataTypeStatic extends ValueDataTypeConstructor{
    fromData(stringValue: string|null, field?: SchemaField): ComparableValueDataType;
    fromEditor(stringValue: string|null, field?: SchemaField): ComparableValueDataType;
}

export type ComparableValueDataTypeConstructor = ComparableValueDataTypeStatic & (new (...args) => ComparableValueDataType);

export interface ComparableValueDataType extends ValueDataType {
    lessThan(x: ValueDataType|string): boolean|null;
    greaterThan(x: ValueDataType|string): boolean|null;
    equals(x: ValueDataType|string): boolean|null;
}

export interface RecordDataType<T>{
    new (jsonData: T, field: SchemaField);
}

export const DefaultEmptyValueString = "";

