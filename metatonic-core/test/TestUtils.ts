import {AnyTypeParameterType, RecordSchemaType, SchemaField, SchemaType} from "../src/domain/Schema/Records";
import {OptionalProps} from "../src/CoreTypes";
import {SchemaEntryType, SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
export {getFormSchemaFromJsonObject} from '../src/services/SchemaFromJsonService';

let _id = 0;
let id = () => (_id++).toString();

export function recordSchema(name: string, label: string, fields: SchemaField[], optionalProps?: OptionalProps<SchemaType>) {
    return Object.assign({
        name,
        label,
        parameters: {fields},
        id: id(),
        category: SchemaTypeCategory.Record,
        parentTypeNames: ['Record'],
        customValidations: []
    }, optionalProps) as RecordSchemaType;
}

export function fieldSchema(name: string, label: string, typeName: string, optionalProps?: OptionalProps<SchemaField>) {
    let fieldId = id();
    return Object.assign({}, {
        name, label, typeName,
        id: fieldId,
        entryType: SchemaEntryType.entry,
        customValidations: []
    } as SchemaField, optionalProps) as SchemaField;
}

export function typeSchema(name: string, label: string, category: SchemaTypeCategory, parentTypeNames?: any[], parameters?: AnyTypeParameterType) {
    return Object.assign({
        name,
        label,
        id: id(),
        category,
        parentTypeNames: parentTypeNames || (getRootType(category) === name ? [] :[ getRootType(category) ]),
        parameters,
        customValidations: [],
    }) as RecordSchemaType;
}

function getRootType(category) {
    switch (category) {
        case SchemaTypeCategory.Quantity: return 'Quantity';
        case SchemaTypeCategory.Numeric: return 'Numeric';
        case SchemaTypeCategory.DateTime: return 'DateTime';
        case SchemaTypeCategory.Boolean: return 'Boolean';
        case SchemaTypeCategory.Record: return 'Record';
        case SchemaTypeCategory.Text: return 'text';
        case SchemaTypeCategory.Code: return 'Code';
    }

}