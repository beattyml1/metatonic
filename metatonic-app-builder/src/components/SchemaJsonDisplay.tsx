import * as React from 'react';
import {Schema} from "metatonic-core";
import {connect} from "react-redux";
import {getSchema} from "../selectors";



export function SchemaJsonDisplay(props: Schema) {
    return (
        <pre className="json code"><code>{
            JSON.stringify(props)
        }</code></pre>)
}

export const SchemaJsonDisplayBound = connect(
    (state) => getSchema(state) as Schema,
    (dispatch) => ({})
)(SchemaJsonDisplay)