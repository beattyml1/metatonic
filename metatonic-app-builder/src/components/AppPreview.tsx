import * as React from 'react';
import {connect} from "react-redux";
import 'metatonic-react/editors'
import {MetaEdit} from 'metatonic-react'
import {defaultComponentRegistry, getEditorResolverContext} from "metatonic-core";
import {ReactEditorResolver} from "metatonic-react";
import {getDefaultDataForField} from "../../../metatonic-core/src/services/DefaultDataService";

export type AppPreviewProps = { schema, formState, formData }
export type AppPreviewEvents = {onFormEvent}

export function AppPreview(props: {onFormEvent, schema, formState, formData }) {
    return <MetaEdit
        editors={getEditorResolverContext(defaultComponentRegistry, props.schema)}
        {...props}
        title={""}
        recordName={""}
        recordId={""}
    ></MetaEdit>
}

export const AppPreviewBound = connect(
    (state: any) => state.formPreviewState as AppPreviewProps,
    dispatch => ({ onFormEvent: (action) => dispatch({...action, meta: {formId: 'preview'}}) }) as AppPreviewEvents
)(AppPreview)