
import {MetatonicType, SchemaEntryType} from "metatonic-core/src/index";

export function model(constructor) {

}

export function field (
    type: MetatonicType,
    label: string,
    editSelect: SchemaEntryType,
    options: {
        required: boolean,
        max: number,
        min: number,
        maxLength: number
}) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}