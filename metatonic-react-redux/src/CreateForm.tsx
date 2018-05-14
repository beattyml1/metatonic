import {MetatonicReduxContext} from "metatonic-redux";
import {MetaForm} from "metatonic-react";
import {FormEvents} from "metatonic-core";
import {Store} from "redux";
import {connect} from 'react-redux';

// Needed for declaration files
// noinspection ES6UnusedImports
import {EditorResolver,FieldState, FormInfo, Schema } from "metatonic-core" // noinspection ES6UnusedImports
import * as React from 'react'
import {MetatonicGlobalState,FormProperties} from "metatonic-core";
import {Thunks} from "metatonic-redux/lib/thunk";

let formCounter = 1;
export function createReactReduxFormInstance(context: MetatonicReduxContext, formId) {
    formId = formId;
    context.registerForm(formId)
    let form = context.form(formId)

    return connect(
        (state: {metatonic: MetatonicGlobalState}) => form.mapStateToProps(state.metatonic.forms[formId]),
        form.mapDispatchToProps
    )(function (props: FormProperties) {
        return (props && props.schema && props.editors) ?
            <MetaForm {...props} /> : <div></div>;
    });
}

export function createAndLoadReactReduxFormForRecord(store: Store<any>, context: MetatonicReduxContext, recordName, recordId?) {
    let formId = `form-${recordName}-${formCounter++}`
    let formComponent = createReactReduxFormInstance(context, formId);
    store.dispatch(new Thunks(context).initialLoad(formId, recordName, recordId) as any);
    return [formComponent, formId];
}