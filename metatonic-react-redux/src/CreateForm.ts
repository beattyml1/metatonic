import {MetatonicReduxContext} from "metatonic-redux";
import {MetaForm} from "metatonic-react";
import {FormEvents} from "metatonic-core";
import {Store} from "redux";
import {connect} from 'react-redux';

// Needed for declaration files
// noinspection ES6UnusedImports
import {EditorResolver,FieldState, FormInfo, Schema } from "metatonic-core" // noinspection ES6UnusedImports
import * as React from 'react'

let formCounter = 1;
export function createReactReduxFormInstance(context: MetatonicReduxContext, formId) {
    formId = formId;
    context.registerForm(formId)
    let form = context.form(formId)

    return connect(form.mapStateToProps, form.mapDispatchToProps)(MetaForm);
}

export function createAndLoadReactReduxFormForRecord(store: Store<any>, context: MetatonicReduxContext, recordName, recordId?) {
    let formId = `form-${recordName}-${formCounter++}`

    let formComponent = createReactReduxFormInstance(context, formId);
    store.dispatch({ type: FormEvents.initialize, payload: { recordName, recordId }, meta: { formId }});
    return [formComponent, formId];
}