
import {Record} from "../models/RecordModel";
import * as camelCase from 'camelcase'
import {AppBuilderActions, AppBuilderState} from "../types/Types";
import {remove, replace} from "../logic/commonFunctions";
import {Field} from "../models/FieldModel";

export function recordAddClick(state: AppBuilderState) {
    let record = { ...new Record(), ...{fields: [new Field()]}} ;
    return {
        ...state,
        records: [...state.records, record],
        record: record
    };;
}

export function recordEditClick(state: AppBuilderState, action: { type: AppBuilderActions; payload }) {
    return { ...state, record: action.payload, field: null };
}

export function recordRemoveClick(state: AppBuilderState, action: { type: AppBuilderActions; payload }) {
    return { ...state, records: remove(state.records, action.payload), field: null, record: null };
}

let getRecordInitialState = function (index: any, state: AppBuilderState) {
    return index !== undefined ? state.records[index] : state.record;
};

let getRecordAfterPropChange = function (record: Record, propName: any, value: any) {
    record = {...record, [propName]: value};
    if (propName === 'label' && !record.hasUserChangedName) record.name = camelCase(record.label, {pascalCase: true});
    if (propName === 'name') record.hasUserChangedName = true;
    return record;
};

export function recordPropChange(state: AppBuilderState, action: { type: AppBuilderActions; payload }) {
    let propName = action.payload.propName
    let index = action.payload.index
    let record = getRecordInitialState(index, state)
    record = getRecordAfterPropChange(record, propName, action.payload.value);
    return {
        ...state,
        record,
        records: replace(state.records, record)
    }
}