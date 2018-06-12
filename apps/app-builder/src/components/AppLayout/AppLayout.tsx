import * as React from 'react';
import {SchemaJsonDisplay, SchemaJsonDisplayBound} from "../SchemaJsonDisplay";
import {AppBuilder, AppBuilderBound} from "../RecordList/AppBuilder";
import {AppPreviewBound} from "../FormView/AppPreview";
import {Record} from '../../models/RecordModel';
import './AppLayout.css'
import {connect} from "react-redux";
import {StyleEditorBound} from "../StyleEditor";

export type AppLayoutProps = {
    records: Record[],
    typeName,
    previewStyles
}
export type AppLayoutEvents = {
    onFormPreviewUpdate, onFormPreviewRecordChanged
}

export function AppLayout(props: AppLayoutProps & AppLayoutEvents) {
    console.log('App Preview')
    return (
        <div className="tabs root-app-builder-layout">
            <form  className="app-builder-section" onSubmit={(e) => { e.preventDefault(); props.onFormPreviewUpdate(); return false; } }>
            <details open>
                <summary>
                    App Builder
                    <div className={"sectionControls"}>
                        <select onChange={(e) => props.onFormPreviewRecordChanged(e.target.value)} value={props.typeName}>
                            {[
                                <option value=""></option>,
                                ...props.records.map(r => <option value={r.name}>{r.label}</option>)]
                            }
                        </select>
                        <button type="submit" >Update Preview</button>
                    </div>
                </summary>
                <AppBuilderBound />
            </details>
            </form>
            <details open className="app-preview-section">
                <summary>
                    App Preview
                </summary>
                <AppPreviewBound />
            </details>
            <details open className="style-editor-section">
                <summary>
                    Styles
                </summary>
                <StyleEditorBound />
            </details>
            <details open className="json-section">
                <summary>JSON Schema</summary>
                <SchemaJsonDisplayBound />
            </details>
            <style>
                {props.previewStyles}
            </style>
        </div>
    )
}

export const AppLayoutBound = connect(
    (state: any) => ({
        ...((state||{}).appBuilder||{records:[]}),
        previewStyles: (state||{}).appliedStyles,
        ...(state||{})
    } as AppLayoutProps),
    (dispatch) => ({
        onFormPreviewUpdate: () => dispatch({ type: 'FORM_PREVIEW__UPDATE'}),
        onFormPreviewRecordChanged: (x) => dispatch({ type: 'FORM_PREVIEW__RECORD_SELECTED', payload: x}),
    }) as AppLayoutEvents
)(AppLayout);