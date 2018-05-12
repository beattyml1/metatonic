import * as React from 'react';
import {SchemaJsonDisplay, SchemaJsonDisplayBound} from "./SchemaJsonDisplay";
import {AppBuilder, AppBuilderBound} from "./AppBuilder";
import {AppPreviewBound} from "./AppPreview";
import {Record} from '../models/RecordModel';
import './AppLayout.css'
import {connect} from "react-redux";

export type AppLayoutProps = {
    records: Record[]
}
export type AppLayoutEvents = {
    onFormPreviewUpdate, onFormPreviewRecordChanged
}

export function AppLayout(props: AppLayoutProps & AppLayoutEvents) {
    return (
        <div className="tabs root-app-builder-layout">
            <details open>
                <summary>Builder</summary>
                <AppBuilderBound />
            </details>
            <details open>
                <summary>JSON</summary>
                <SchemaJsonDisplayBound />
            </details>
            <details open>
                <summary>
                    Preview
                    <select onChange={(e) => props.onFormPreviewRecordChanged(e.target.value)}>
                        {props.records.map(r => <option value={r.name}>{r.label}</option>)}
                    </select>
                    <button type="button" onClick={props.onFormPreviewUpdate}></button>
                </summary>
                <AppPreviewBound />
            </details>
        </div>
    )
}

export const AppLayoutBound = connect(
    (state: {appBuilder: {records}}) => ((state||{}).appBuilder||{records:[]} as AppLayoutProps),
    (dispatch) => ({
        onFormPreviewUpdate: () => dispatch({ type: 'FORM_PREVIEW__UPDATE'}),
        onFormPreviewRecordChanged: (x) => dispatch({ type: 'FORM_PREVIEW__RECORD_SELECTED', payload: x}),
    }) as AppLayoutEvents
)(AppLayout);