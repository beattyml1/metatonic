import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType, SchemaTypeGeneric} from "./Records";
import {SchemaElement} from "./SchemaElement";
import {SchemaTypeCategory} from "./SchemaEnums";

interface JsMap<T> {
    [key: string]: T;
}

export type Schema = {
    types: JsMap<SchemaType>;
}

export type FormInfo = SchemaElement & {
    rootType: RecordSchemaType;
};

export type FormSchema = Schema & FormInfo