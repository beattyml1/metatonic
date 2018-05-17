import * as React from 'react';
import {connect} from "react-redux";
import 'metatonic-react/editors'
import {MetaEdit} from 'metatonic-react'
import {defaultComponentRegistry, getEditorResolverContext} from "metatonic-core";
import {ReactEditorResolver} from "metatonic-react";
import {getDefaultDataForField} from "metatonic-core";

export type AppPreviewProps = { schema, formState, formData }
export type AppPreviewEvents = {onFormEvent}

export function AppPreview(props: {onFormEvent, schema, formState, formData }) {
    console.log('props.formState', props.formState)
    return props.schema ? <MetaEdit
        editors={getEditorResolverContext(defaultComponentRegistry, props.schema)}
        {...props}
        title={""}
        recordName={""}
        recordId={""}
    ></MetaEdit> : <div></div>
}

export const AppPreviewBound = connect(
    (state: {formPreviewState: {schema:{}, formState:{}, formData:{}} }) => (state||{}).formPreviewState||{schema:null, formState:null, formData:null} as AppPreviewProps,
    dispatch => ({ onFormEvent: (action) => dispatch({...action, meta: {formId: 'preview'}}) }) as AppPreviewEvents
)(AppPreview)