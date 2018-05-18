
import {AppBuilderActions, AppBuilderState} from "../Types";
import {Field} from "../models/FieldModel";
import * as camelCase from 'camelcase'
import {remove, replace} from '../commonFunctions'



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