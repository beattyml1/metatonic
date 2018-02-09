import * as core from 'metatonic-core/src/index';
import { Schema, SchemaField, SchemaType, FormSchema, FormInfo, SchemaFieldInfo } from 'metatonic-core/src/index'
import {RecordSchemaType} from "metatonic-core/src/index";

let schema = <Schema> {
    types: {
        Field: <SchemaType> {

        },
        Type: <SchemaType> {

        }
    }
}

let forms: FormSchema[] = [
    <FormInfo>{
        name: 'createRecordType',
        label: 'Add record type',
        rootType: {
            name: ""
        }
    },
    <FormInfo>{
        name: 'createRecordType',
        label: 'Add record type',

    }
].map(_ => Object.assign(_, schema));