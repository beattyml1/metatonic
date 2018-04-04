import {Store} from "redux";
import {MetatonicRootAction} from "metatonic-core";
import {MetatonicApp, MetatonicContext, MetatonicGlobalState} from "metatonic-core";
import {AppDispatcher} from "metatonic-core";
import {AllMetatonicEvents, FormState, MetatonicAction} from "../../metatonic-core/src/domain/StateManagementTypes";
import {FormProperties} from "../../metatonic-core/src/domain/EditorModels/FormProperties";

export interface MetatonicReduxApp extends MetatonicApp {
    appStore: Store<any>,
    appDispatcher: AppDispatcher;

    reduxMiddleware(store: Store<any>): (next) => (action) => any;
}

export interface MetatonicReduxContext extends MetatonicContext {
    app: MetatonicReduxApp
    createFormReducer(formId): (state: FormState, action: MetatonicAction) => FormState;
    mapStateToProps(formState: FormState): FormProperties;
    mapStateToDispatch(formId: string):
        (dispatch: (action: AllMetatonicEvents) => void) =>
            ({ onFormEvent: (action: AllMetatonicEvents) => void });
    loadForm(formId, recordName, recordId)
}