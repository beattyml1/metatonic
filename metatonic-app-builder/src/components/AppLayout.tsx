import * as React from 'react';
import {SchemaJsonDisplay, SchemaJsonDisplayBound} from "./SchemaJsonDisplay";
import {AppBuilder, AppBuilderBound} from "./AppBuilder";
import {AppPreviewBound} from "./AppPreview";
import {Record} from '../models/RecordModel'

export type AppLayoutProps = {
    records: Record[]
}
export type AppLayoutEvents = {}

export const AppLayoutStyles =`
    <style>
        .tab {
          display: flex;
        }
        .tab>details {
          padding: 10px;
          padding-top:0;
          border:1px solid gray;
        }
        .tab>details>summary {
          margin-bottom: 20px;
          margin-left: -10px;
          margin-right: -10px;
          padding: 10px;
          border-top: 2px solid gray;
        }
    </style>`

export function AppLayout(props: AppLayoutProps & AppLayoutEvents) {
    return (
        <div className="tabs root-app-builder-layout">
            <details open>
                <summary>Builder</summary>
                <AppBuilderBound />
            </details>
            <details>
                <summary>JSON</summary>
                <SchemaJsonDisplayBound />
            </details>
            <details>
                <summary>
                    Preview
                    <select></select>
                </summary>
                <AppPreviewBound />
            </details>
        </div>
    )
}