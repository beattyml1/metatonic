
import {AppBuilderActions, AppBuilderState} from "../types/Types";
import {Field} from "../models/FieldModel";
import * as camelCase from 'camelcase'
import {remove, replace} from '../logic/commonFunctions'
import {getFieldAndParentType, getTypeForFieldLocator} from "../logic/fieldLocators";



export let fieldAddClick = function (state: AppBuilderState) {
    let field = new Field();
    let record = {...state.record, fields: [ ...state.record.fields||[], field ]}
    return {
        ...state,
        field,
        record,
        records: replace(state.records, record)
    };
};



// export let fieldAdd = function (state: AppBuilderState, action) {
//     let fieldLocator = action.payload.fieldLocator;
//     let type = getTypeForFieldLocator(fieldLocator, schema);
//
//     let field = new Field();
//     field.label = 'New Field';
//     field.name = 'newField';
//     let record = state.records.find(r => r.id === type.id);
//     record = {...record, fields: [ ...record.fields||[], field ]}
//     return {
//         ...state,
//         field,
//         record,
//         records: replace(state.records, record)
//     };
// };
//
// export function fieldEdit(state: AppBuilderState, action: { payload }) {
//     let fieldLocator = action.payload.fieldLocator;
//     let {field, parentType} = getFieldAndParentType(fieldLocator, schema);
//     let record = state.records.find(r => r.id === parentType.id);
//     let f = record.fields.find(f => f.id === field.id);
//     return { ...state, field: f } ;
// }

export function fieldEditClick(state: AppBuilderState, action: { payload }) {
    return { ...state, field: action.payload } ;
}

export function fieldRemoveClick(state: AppBuilderState, action: { type: AppBuilderActions; payload }) {
    let record = { ...state.record, fields: remove(state.record.fields, action.payload) }
    return { ...state, record: record, records: replace(state.records, record), field: null };
}

export function fieldPropChange(state: AppBuilderState, action: { type: AppBuilderActions; payload: { recordName, fieldName, propName, value, index, category } }) {
    let index = action.payload.index
    let value = action.payload.value;
    let prop = action.payload.propName
    let field = getFieldPreviousState(state, index)

    field = fieldPropChangeForField(field, prop, value);

    return setFieldOnState(state, field);
}

function getFieldPreviousState(state: AppBuilderState, index?) {
    return index !== undefined ? state.record.fields[index] : state.field;
}

function fieldPropChangeForField(field: Field, prop, value) {
    field = { ...field, [prop]: value }
    if (prop === 'label' && !field.hasUserChangedName) field.name = camelCase(field.label);
    if (prop === 'name') field.hasUserChangedName = true;
    return field;
}

function setFieldOnState(state: AppBuilderState, field: Field) {
   let record = {...state.record, fields: replace(state.record.fields, field)}
    return {
        ...state,
        field,
        record,
        records: replace(state.records, record)
    }
}