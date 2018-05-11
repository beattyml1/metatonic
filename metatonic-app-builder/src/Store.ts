
import {combineReducers, Reducer} from "redux";
import {formReduce} from 'metatonic-redux/src/PrimaryFormReducer'
import {getDefaultFormState} from "../../metatonic-core/src/services/DefaultFormState";
import {getDefaultDataForField} from "../../metatonic-core/src/services/DefaultDataService";

function compute(reducer: Reducer<any>) {
    return (s, a) => {
        let state = reducer(s, a);
        if (a.type.includes('BUILDER__')) {
           return {
               ...state,
               formState: {
                   ...state.formState,
                   formData: getDefaultDataForField(state.formState.schema),
                   formState: getDefaultFormState(state.formState.schema)
               }
           }
        } return state;
    }
}

let appBuilderReducer = function (state, action) {
    switch (action.type) {
        default: return state;
    }
}

let primaryReducer = compute(combineReducers({
    appBuilder: appBuilderReducer,
    formPreviewState: formReduce('preview')
}));