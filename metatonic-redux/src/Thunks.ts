import {MetatonicRootAction, FormState, RecordResource} from "metatonic-core";
import {copyAndSet} from "metatonic-core";
import {FormEvents} from "metatonic-core";
import {MetatonicReduxContext, MetatonicAppConfig} from "./MetatonicReduxApp.interfaces";
import {async} from "xhr-mock/lib/handle";
import {FormSchema} from "metatonic-core";
import {MetatonicReduxAppInstance} from "./MetatonicReduxAppInstance";
import {createMetatonicAppInitializer} from "./createMetatonicAppInitializer";
import {OptionalProps} from "metatonic-core/lib";
import {initializeState, initializeStateEmpty, loadFinished, loadStarted} from "./Events";

export class Thunks {
    constructor(public context: MetatonicReduxContext) {

    }

    form = (formId, typeName?) => ({
        getState: () => this.context.form(formId).state(),
        resource: this.context.dataStore.records(typeName||this.context.form(formId).state().schema.typeName) as RecordResource<any>
    })

    submitThunk = (action: MetatonicRootAction) => {
        let formId = action.meta.formId;
        let form = this.form(formId);

        return async (dispatch: (action: MetatonicRootAction) => void, getState: () => FormState) => {
            await dispatch(copyAndSet(action, {type: FormEvents.validateFormSync }));
            await dispatch(copyAndSet(action, {type: FormEvents.submitCallStarted }));
            let state = form.getState();
            let result = await this.context.asyncMethods.doSubmit(state);
            await dispatch(copyAndSet(action, {type: FormEvents.submitSucceeded, payload: result}));
            await dispatch(copyAndSet(action, {type: FormEvents.submitAttemptFinished}));
        }
    }

    initialLoad = (formId, typeName, recordId) => {
        return async (dispatch: (action: MetatonicRootAction) => void, getState: () => FormState) => {
            await dispatch(initializeStateEmpty(formId));
            await dispatch(loadStarted(formId));
            let state = await this.context.asyncMethods.fetchInitialFormState(typeName, recordId);
            await dispatch(initializeState(formId, state));
            await dispatch(loadFinished(formId));
        }
    }

    thunkActionWrapper = (action: MetatonicRootAction) => {
        switch (action.type) {
            case FormEvents.trySubmit: return this.submitThunk(action);
            case FormEvents.initialize: return this.initialLoad(action.meta.formId, action.payload.recordName, action.payload.recordId);
            default: return action;
        }
    }
}

export function createMetatonicReduxThunkApp(metatonicConfig: MetatonicAppConfig) {
    return new MetatonicReduxAppInstance(createMetatonicAppInitializer(metatonicConfig), context => ({
        action: new Thunks(context).thunkActionWrapper
    }));
}
