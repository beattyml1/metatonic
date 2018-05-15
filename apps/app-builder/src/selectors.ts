import {getFormSchemaFromJsonObject} from "metatonic-core";
import {FormSchema} from "metatonic-core";
import {Field} from "./models/FieldModel";
import {Record} from "./models/RecordModel";
import {RecordSchemaType,ObjectDataStorage,defaultComponentRegistry} from "metatonic-core";
import {BaseSchema} from "./BuiltInTypes";
import {SchemaTypeCategory} from "metatonic-core";
import {createMetatonicReduxThunkApp} from "metatonic-redux/lib/thunk";

type AppBuilderState = {
    field: Field,
    record: Record,
    records: Record[]
}


export function getSchema(state: { appBuilder: AppBuilderState, formPreviewState: {schema: FormSchema} } , recordName?) {
    if (!state || !state.appBuilder) return {};
    let typeName = recordName || (((state||{}).formPreviewState||{}).schema||{}).typeName;
    let schemaSimple = {
        typeName: typeName,
        types: [
            ...state.appBuilder.records.map(record => {
                return {
                    id: record.id,
                    category: SchemaTypeCategory.Record,
                    name: record.name,
                    label: record.label,
                    uiControlPreference: record.uiControlPreference,
                    parameters: { fields: record.fields }
                };
            }),
            ...Object.keys(BaseSchema).map(k=>BaseSchema[k])
        ]
    };

    if (!typeName) return schemaSimple;
    return getFormSchemaFromJsonObject(schemaSimple as any);
}