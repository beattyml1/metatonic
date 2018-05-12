import * as React from 'react';
import {Field} from "../models/FieldModel";
import {Record} from "../models/RecordModel";
import {BaseSchema} from '../BuiltInTypes'


export function TypeSelector(props: { field: Field, records: Record[], onChange, includeValues }) {
    return <select value={props.field.typeName}  >
        {props.records.map(x =>
            <option value={x.name}>{x.label||x.name}</option>)}
        {Object.keys(BaseSchema).filter(_=>props.includeValues).map(name => BaseSchema[name]).map(type =>
            <option value={type.name}>{type.label||type.name}</option>
        )}
    </select>
}