
import {getDefaultFormState} from "metatonic-core";
import {getDefaultDataForField,getFormSchemaFromJsonObject,SchemaTypeCategory} from "metatonic-core";
import {getSchema} from "../selectors";

function selectedTypeName(state) {
    return (state||{}).typeName
}

function validateField(field, record) {
    return [
        field.name ? '' : `Name is required on field '${field.label}' for record '${record.name}'`,
        field.label ? '' : `Label is required on field '${field.name}' for record '${record.name}'`,
        field.typeName ? '' : `Type is required on field '${field.name}' for record '${record.name}'`
    ].filter(_=>_)
}

function validateRecord(record) {
    return [
        record.name ? '' : `Name is required record '${record.label}'`,
        record.label ? '' : `Label is required on record '${record.name}'`
    ].filter(_=>_)
}

function validateAppBuilder(state) {
    return state.appBuilder.records.reduce((messages, record) => {
        return [
            ...messages,
            ...validateRecord(record),
            ...record.fields.reduce((messages, field) => {
                return [...messages, ...validateField(field, record)]
            }, [])
        ]
    }, [])
}

function getFormPreviewStateInitialForRecord(state: { appBuilder, formPreviewState }, typeName) {
    let schemaSimple = getSchema(state, typeName);
    let schema = getFormSchemaFromJsonObject(schemaSimple);
    let formData = getDefaultDataForField(schema);
    let formState = getDefaultFormState(schema.type, formData)
    return { ...state.formPreviewState, schema, formData, formState }
}

export function formPreviewStateEvent(state: { appBuilder, formPreviewState }, action) {
    switch (action.type) {
        case 'FORM_PREVIEW__RECORD_SELECTED':
            let typeName = action.payload
        case 'FORM_PREVIEW__UPDATE':
            typeName = typeName || selectedTypeName(state);
            if (!typeName) return state;

            let messages = validateAppBuilder(state);
            console.log('allmessages', messages)

            if (messages && messages.length) return {...state, messages, typeName}
            return {
                ...state,
                formPreviewState: getFormPreviewStateInitialForRecord(state, typeName),
                typeName,
                messages: []
            };
        default: return state||{
            appBuilder: {
                records: [],
                record: null,
                field: null
            }
        };
    }
}
