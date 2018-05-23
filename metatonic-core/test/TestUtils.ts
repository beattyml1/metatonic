import {AnyTypeParameterType, RecordSchemaType, SchemaField, SchemaType} from "../src/domain/Schema/Records";
import {OptionalProps} from "../src/CoreTypes";
import {SchemaEntryType, SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
import {SchemaFieldInfo} from "../src/domain/Schema/SchemaFieldInfo";
export {getFormSchemaFromJsonObject} from '../src/services/SchemaFromJsonService';
import {QuantityTypeParameters, UnitSourceSpec} from '../src/domain/Schema/Quantities'
import {NumericTypeInfo} from "../src/domain/Schema/Numerics";
import {DateTimeTypeData, DateTimeTypes} from "../src/domain/Schema/DateTimeType";

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
        validations: []
    }, optionalProps) as RecordSchemaType;
}

export function fieldSchema(name: string, label: string, typeName: string, optionalProps?: OptionalProps<SchemaField>) {
    let fieldId = id();
    return Object.assign({}, {
        name, label, typeName,
        id: fieldId,
        entryType: SchemaEntryType.entry,
        validations: [],
        uiUniqueId:'a'
    } as SchemaFieldInfo, optionalProps) as SchemaField;
}

export function typeSchema(name: string, label: string, category: SchemaTypeCategory, parentTypeNames?: any[], parameters?: AnyTypeParameterType) {
    parameters = parameters || getDefaultParameters(category)
    return Object.assign({
        name,
        label,
        id: id(),
        category,
        parentTypeNames: parentTypeNames || (getRootType(category) === name ? [] :[ getRootType(category) ]),
        parameters,
        validations: [],
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

export function getDefaultParameters(category) {
    switch (category) {
        case SchemaTypeCategory.Quantity: return { unitSource: {} as UnitSourceSpec, numericFormat: getDefaultParameters(SchemaTypeCategory.Numeric) } as QuantityTypeParameters;
        case SchemaTypeCategory.Numeric: return {isInteger: false, isFloating: false} as NumericTypeInfo;
        case SchemaTypeCategory.DateTime: return {type: DateTimeTypes.Date, params: {}} as DateTimeTypeData;
        case SchemaTypeCategory.Boolean: return {};
        case SchemaTypeCategory.Text: return {};
        case SchemaTypeCategory.Code: return {};
    }
}