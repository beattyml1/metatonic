import {getFormSchemaFromJsonObject} from "metatonic-core";
import {FormSchema} from "metatonic-core";
import {Field} from "./models/FieldModel";
import {Record} from "./models/RecordModel";
import {RecordSchemaType} from "metatonic-core";

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
        types: state.appBuilder.records.map(record => {
            return {
                id: record.id,
                name: record.name,
                label: record.label,
                uiControlPreference: record.uiControlPreference,
                parameters: { fields: record.fields }
            };
        })
    };

    if (!typeName) return schemaSimple;
    return getFormSchemaFromJsonObject(schemaSimple as any);
}