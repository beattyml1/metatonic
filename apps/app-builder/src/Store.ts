
import {combineReducers, Reducer} from "redux";
import {formReduce} from 'metatonic-redux/lib/src/PrimaryFormReducer'
import {AppBuilderActions, AppBuilderState} from "./Types";
import {fieldAddClick, fieldEditClick, fieldPropChange, fieldRemoveClick} from "./reducers/FieldAppBuilderReducers";
import {
    recordAddClick, recordEditClick, recordPropChange,
    recordRemoveClick
} from "./reducers/RecordAppBuilderReducers";
import {formPreviewStateEvent} from "./reducers/AppPreviewReducers";
import {Record} from './models/RecordModel'
import {Field} from "./models/FieldModel";

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



let formPreviewRecordSelected = function (state, action) {
   return action.type === 'FORM_PREVIEW__RECORD_SELECTED' ?
       action.payload : state||'';
}


let appBuilderReducer = function (state: AppBuilderState, action: { type: AppBuilderActions, payload}) {
    switch (action.type) {
        case AppBuilderActions.FieldAddClick: return fieldAddClick(state);
        case AppBuilderActions.FieldEditClick: return fieldEditClick(state, action);
        case AppBuilderActions.FieldPropChange: return fieldPropChange(state, action);
        case AppBuilderActions.FieldRemoveClick: return fieldRemoveClick(state, action);
        case AppBuilderActions.RecordAddClick: return recordAddClick(state);
        case AppBuilderActions.RecordEditClick: return recordEditClick(state, action);
        case AppBuilderActions.RecordPropChange: return recordPropChange(state, action);
        case AppBuilderActions.RecordARemoveClick: return recordRemoveClick(state, action);
        default: return state||{
            records: [new Record()],
            record: null,
            field: null
        };
    }
}

function globals(reducer: Reducer) {
    return (state, action) => {
        if (action.type == '@@INIT') {
            let record = {...new Record(), ...{fields: [new Field()]} }
            return {
                appBuilder: {
                    records: [record],
                    record: record,
                    field: record.fields[0]
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
export const primaryReducer = globals(combineReducers({
    appBuilder: appBuilderReducer,
    formPreviewState: (state, action) => formReduce('preview')(state, {...action, meta:{formId: 'preview'}}),
    messages: s => s||[],
    typeName: s => s||''
}));

