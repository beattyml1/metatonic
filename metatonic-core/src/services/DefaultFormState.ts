import { FieldState } from '../domain/FieldState/FieldState'
import {SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

type FieldStateChildren = { [property: string]: FieldState; [property: number]: FieldState }
type FieldStateAdder = (children: FieldStateChildren, field: SchemaField) => FieldStateChildren;

export function getDefaultFormState(type: SchemaType, value?) {
    const addChildFieldStateForField:FieldStateAdder = (children, field) => Object.assign(children, {
        [field.name]: field.multiple && value && value[field.name] && Array.isArray(value[field.name]) ?
            {
                validationMessages:[],
                children: value[field.name].map((x, i) => getDefaultFormState(field.type, value[field.name][i]))
            } as FieldState :
            getDefaultFormState(field.type, value && value[field.name])
    });
    switch (type.category) {
        case SchemaTypeCategory.Record: return <FieldState> {
            validationMessages: [],
            children: (type.parameters as SchemaRecordTypeParameters).fields.reduce(addChildFieldStateForField, {})
        }
        default: return <FieldState>{ children:{}, validationMessages: [] }
    }
}2