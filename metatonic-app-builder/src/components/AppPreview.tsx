import * as React from 'react';
import {connect} from "react-redux";
import 'metatonic-react/editors'
import {MetaEdit} from 'metatonic-react'
import {formReduce} from 'metatonic-redux/src/PrimaryFormReducer'
import {defaultComponentRegistry, getEditorResolverContext} from "metatonic-core";
import {ReactEditorResolver} from "metatonic-react";
import {getDefaultDataForField} from "../../../metatonic-core/src/services/DefaultDataService";


export function AppPreview(props: {onFormEvent, schema, formState }) {
    return <MetaEdit
        editors={getEditorResolverContext(defaultComponentRegistry, props.schema)}
        formData={getDefaultDataForField(props.schema)}
        {...props}
        title={""}
        recordName={""}
        recordId={""}
    ></MetaEdit>
}

export const AppPreviewBound = connect(
    state => state,
    dispatch => ({ onFormEvent: dispatch })
)(AppPreview)