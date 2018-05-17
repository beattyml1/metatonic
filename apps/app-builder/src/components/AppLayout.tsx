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
            <form  className="app-builder-section" onSubmit={(e) => { e.preventDefault(); props.onFormPreviewUpdate(); return false; } }>
            <details open>
                <summary>
                    Builder
                    <div className={"sectionControls"}>
                        <select onChange={(e) => props.onFormPreviewRecordChanged(e.target.value)}>
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
            <details open className="json-section">
                <summary>JSON</summary>
                <SchemaJsonDisplayBound />
            </details>
            <details open className="app-preview-section">
                <summary>
                    Preview
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