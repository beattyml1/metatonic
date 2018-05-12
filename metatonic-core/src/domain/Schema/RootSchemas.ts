import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType, SchemaTypeGeneric} from "./Records";
import {SchemaElement} from "./SchemaElement";
import {SchemaTypeCategory} from "./SchemaEnums";

export interface Schema {
    types: { [key: string]:SchemaType };
}

export interface FormInfo extends SchemaElement {
    type: RecordSchemaType;
    typeName: string;
};

export type FormSchema = Schema & FormInfo