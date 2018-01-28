export enum SchemaEntryType {
    entry = "entry",
    selection = "selection",
}

export type SelectUi = "search" | "dropdown" | "list"
export type UiListLayoutDirection = "vertical" | "horizontal"
export type MultiSingle = "single" | "list" | "static-list"

export enum SchemaTypeCategory {
    Record = 1,
    Quantity,
    Numeric,
    DateTime,
    Text,
    Boolean,
    Code
}

export type BuiltinTypes = "record" | "text" | "numeric" | "string" | "date" | "time" | "datetime" | "timestamp" | "quantity" | "code" | "boolean";
export type MetatonicType = BuiltinTypes | string;