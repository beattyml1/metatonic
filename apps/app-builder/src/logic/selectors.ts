import {getFormSchemaFromJsonObject} from "metatonic-core";
import {FormSchema} from "metatonic-core";
import {Field} from "../models/FieldModel";
import {Record} from "../models/RecordModel";
import {RecordSchemaType,ObjectDataStorage,defaultComponentRegistry} from "metatonic-core";
import {BaseSchema} from "../models/BuiltInTypes";
import {SchemaTypeCategory, SchemaType, SchemaField, Schema}  from "metatonic-core";
import {createMetatonicReduxThunkApp} from "metatonic-redux/lib/thunk";

type AppBuilderState = {
    field: Field,
    record: Record,
    records: Record[]
}

function getRecordType(record: Record) {
    return {
        id: record.id,
        category: SchemaTypeCategory.Record,
        name: record.name,
        label: record.label,
        uiControlPreference: record.uiControlPreference,
        parentTypeNames: ["Record"],
        validations:[],
        parameters: {fields: record.fields.map(getField), items: []}
    } as SchemaType
}

function typeMapForRecords(records: Record[]) {
    return records.reduce((types, record) => ({
        ...types,
        [record.name]: getRecordType(record)
    }), {})
}

function getField(field: Field) {
    return {
        ...field,
        category: SchemaTypeCategory.Record
    } as any as SchemaField
}


export function getSchema(state: { appBuilder: AppBuilderState, formPreviewState: {schema: FormSchema} } , recordName): FormSchema {
    if (!state || !state.appBuilder) return {} as any;
    let typeName = recordName || (((state||{}).formPreviewState||{}).schema||{}).typeName;
    let schemaSimple = {
        typeName: typeName,
        types: {
            ...typeMapForRecords(state.appBuilder.records),
            ...BaseSchema
        }
    } as Schema as any as FormSchema;

    return (schemaSimple as any);
}