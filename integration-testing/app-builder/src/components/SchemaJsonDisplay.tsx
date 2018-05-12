import * as React from 'react';
import {Schema} from "metatonic-core";
import {connect} from "react-redux";
import {getSchema} from "../selectors";
import * as beautify from 'json-beautify'



export function SchemaJsonDisplay(props: Schema) {
    return (
        <pre className="json code"><code>{
            beautify(props, null, 2, 50)
        }</code></pre>)
}

export const SchemaJsonDisplayBound = connect(
    (state: any) => getSchema(state) as Schema,
    (dispatch) => ({})
)(SchemaJsonDisplay)