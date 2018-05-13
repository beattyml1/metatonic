
import {combineReducers, Reducer} from "redux";
import {formReduce} from 'metatonic-redux/lib/src/PrimaryFormReducer'
import {getDefaultFormState} from "metatonic-core";
import {getDefaultDataForField} from "metatonic-core";
import {getSchema} from "./selectors";
import {Field} from "./models/FieldModel";
import {Record} from "./models/RecordModel";

// function compute(reducer: Reducer<any>) {
//     return (s, a) => {
//         let state = reducer(s, a);
//         if (a.type.includes('BUILDER__')) {
//             let schema = getSchema(state);
//
//            return {
//                ...state,
//                formPreviewState: {
//                    ...state.formPreviewState,
//                    schema,
//                    formData: getDefaultDataForField(schema),
//                    formState: getDefaultFormState(schema)
//                }
//            }
//         } return state;
//     }
// }



type AppBuilderState = {
    field: Field,
    record: Record,
    records: Record[]
}

let formPreviewRecordSelected = function (state, action) {
   return action.type === 'FORM_PREVIEW__RECORD_SELECTED' ?
       action.payload : state||'';
}

export enum AppBuilderActions {
    RecordPropChange = 'BUILDER__RECORD_PROP_CHANGE',
    RecordEditClick = 'BUILDER__RECORD_EDIT_CLICK',
    RecordAddClick = 'BUILDER__RECORD_ADD_CLICK',
    FieldPropChange = 'BUILDER__FIELD_PROP_CHANGE',
    FieldEditClick = 'BUILDER__FIELD_EDIT_CLICK',
    FieldAddClick = 'BUILDER__FIELD_ADD_CLICK',
};

let fieldAddClick = function (state: AppBuilderState) {
    let field = new Field();
    return {
        ...state,
        field,
        records: state.records.map(r => ({...r, fields: [ ...state.record.fields||[], field ]})),
        record: {
            ...state.record,
            fields: [ ...state.record.fields||[], field ]
        }
    };
};

function fieldEditClick(state: AppBuilderState, action: { payload }) {
    return {...state, field: action.payload } ;
}

function fieldPropChange(state: AppBuilderState, action: { type: AppBuilderActions; payload: { recordName, fieldName, propName, value, index, category } }) {
    let index = action.payload.index
    let field = index !== undefined ? state.record.fields[index] : state.field
    field = { ...field, [action.payload.propName]: action.payload.value }
    if (index !== undefined) state.record.fields[index] = field
    if (index !== undefined) state.records.find(x => x.id == state.record.id)!.fields[index] = field
    return {...state, field };
}

function recordAddClick(state: AppBuilderState) {
    let record = new Record();
    return {
        ...state,
        records: [...state.records, record],
        record: record
    };;
}

function recordEditClick(state: AppBuilderState, action: { type: AppBuilderActions; payload }) {
    return {...state, record: action.payload};
}

function recordPropChange(state: AppBuilderState, action: { type: AppBuilderActions; payload }) {
    let index = action.payload.index
    let record = index !== undefined ? state.records[index] : state.record
    record = { ...record, [action.payload.propName]: action.payload.value };
    if (index !== undefined) state.records[index] = record
    return {...state, record, records: state.records}
}

let appBuilderReducer = function (state: AppBuilderState, action: { type: AppBuilderActions, payload}) {
    switch (action.type) {
        case AppBuilderActions.FieldAddClick: return fieldAddClick(state);
        case AppBuilderActions.FieldEditClick: return fieldEditClick(state, action);
        case AppBuilderActions.FieldPropChange: return fieldPropChange(state, action);
        case AppBuilderActions.RecordAddClick: return recordAddClick(state);
        case AppBuilderActions.RecordEditClick: return recordEditClick(state, action);
        case AppBuilderActions.RecordPropChange: return recordPropChange(state, action);
        default: return state||{
            records: [],
            record: null,
            field: null
        };
    }
}

function globals(reducer: Reducer) {
    return (state, action) => {
        if (action.type == '@@INIT') {
            return {
                appBuilder: {
                    records: [],
                    record: null,
                    field: null
                },
                formPreviewState: {

                }
            }
        }
        state = reducer(state, action);
        state = formPreviewStateEvent(state, action)
        return state
    }
}

function formPreviewStateEvent(state: { appBuilder, formPreviewState }, action) {
    let schema;
    switch (action.type) {
        case 'FORM_PREVIEW__RECORD_SELECTED':
            schema = getSchema(state, action.payload);
            return {
               ...state,
               formPreviewState: {
                   ...state.formPreviewState,
                   schema,
                   formData: getDefaultDataForField(schema),
                   formState: getDefaultFormState(schema)
               }
           }
        case 'FORM_PREVIEW__UPDATE':
            schema = getSchema(state);
            return {
                ...state,
                formPreviewState: {
                    ...state.formPreviewState,
                    schema,
                    formData: getDefaultDataForField(schema),
                    formState: getDefaultFormState(schema)
                }
            }
        default: return state||{
            appBuilder: {
                records: [],
                record: null,
                field: null
            }
        };
    }
}

export const primaryReducer = globals(combineReducers({
    appBuilder: appBuilderReducer,
    formPreviewState: (state, action) => formReduce('preview')(state, {...action, meta:{formId: 'preview'}})
}));

