

import {MetatonicType, SchemaEntryType} from "../domain/Schema/SchemaEnums";

export function model() {
    return function (constructor) {

    }
}

export function field (
    type: MetatonicType,
    label: string,
    editSelect: SchemaEntryType,
    options: {
        required: boolean,
        max: number,
        min: number,
        maxLength: number,
        canAdd: boolean
}) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}

export function list (
    type: MetatonicType,
    label: string,
    editSelect: SchemaEntryType,
    options: {
        required: boolean,
        max: number,
        min: number,
        maxLength: number,
        canAdd: boolean
    }) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}