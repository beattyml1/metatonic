import {SchemaField, SchemaRecordTypeParameters, SchemaType, SchemaTypeGeneric} from "./Records";
import {SchemaElement} from "./SchemaElement";

interface JsMap<T> {
    [key: string]: T;
}

export type Schema = {
    types: JsMap<SchemaType>;
}

export type FormInfo = SchemaElement & {
    rootType: SchemaTypeGeneric<SchemaRecordTypeParameters, >;
};

export type FormSchema = Schema & FormInfo