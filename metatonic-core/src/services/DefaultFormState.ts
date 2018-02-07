import { FieldState } from 'domain/FieldState/FieldState'
import {SchemaField, SchemaRecordTypeParameters, SchemaType} from "domain/Schema/Records";
import {SchemaTypeCategory} from "domain/Schema/SchemaEnums";

export function getDefaultFormState(type: SchemaType) {
    switch (type.category) {
        case SchemaTypeCategory.Record: return <FieldState> {
            validationMessages: [],
            children: (type.parameters as SchemaRecordTypeParameters).fields.reduce((children, field) => Object.assign(children, {
                [field.name]: getDefaultFormState(field.type)
            }), {})
        }
        default: return <FieldState>{ children:{}, validationMessages: [] }
    }
}