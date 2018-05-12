import * as React from 'react';
import {Field} from "../models/FieldModel";
import {Record} from "../models/RecordModel";



export function TypeSelector(props: { field: Field, records: Record[], onChange }) {
    return <select value={props.field.typeName}  >
        {props.records.map(x =>
            <option value={x.name}>{x.label}</option>)}
    </select>
}