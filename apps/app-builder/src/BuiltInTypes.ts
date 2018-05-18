import {AnyTypeParameterType, RecordSchemaType, SchemaField, SchemaType} from "metatonic-core";
import {OptionalProps} from "metatonic-core/";
import {SchemaEntryType, SchemaTypeCategory} from "metatonic-core";
import {SchemaFieldInfo} from "metatonic-core";
import {DateTimeTypes} from "metatonic-core";
import {LeftRight, QuantityTypeParameters, Unit, UnitCategory} from "metatonic-core";
export {getFormSchemaFromJsonObject} from 'metatonic-core';

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
export const BaseSchema = {
    'Record': recordSchema('Record', 'Record', []),
    'Integer': typeSchema('Integer', 'Integer', SchemaTypeCategory.Numeric, ['Numeric'], {isInteger:true, isFloating: false }),
    'date': typeSchema('date', "Date", SchemaTypeCategory.DateTime, undefined, {type:DateTimeTypes.Date, params: { } }),
    'time': typeSchema('time', "Time", SchemaTypeCategory.DateTime, undefined, {type:DateTimeTypes.Time, params: { } }),
    'datetime': typeSchema('date', "Date Time", SchemaTypeCategory.DateTime, undefined, {type:DateTimeTypes.DateTime, params: { } }),
    'timestamp': typeSchema('timestamp', "Time Stamp", SchemaTypeCategory.DateTime, undefined, {type:DateTimeTypes.TimeStamp, params: { } }),
    'Dollars': typeSchema('Dollars', 'Dollars', SchemaTypeCategory.Quantity, [ 'Currency', 'Quantity' ], {
        unitSource: { unit: 'dollars'},
        numericFormat: {} } as any as QuantityTypeParameters),
    'Numeric': typeSchema('Numeric', 'Numeric', SchemaTypeCategory.Numeric, []),
    'Decimal': typeSchema('Decimal', 'Decimal', SchemaTypeCategory.Numeric, ['Numeric'], { isFloating: false, isInteger: false }),
    'Float': typeSchema('Float', 'Float', SchemaTypeCategory.Numeric, ['Numeric'], { isFloating: true, isInteger: false }),
    'Currency': typeSchema('Currency', 'Currency', SchemaTypeCategory.Quantity, undefined, {
        unitSource: { unitCategory: {name: 'currency'} },
        numericFormat: {fixedDecimalDigits: 2, isFloating: false, isInteger: false}} as QuantityTypeParameters),
    'Quantity': typeSchema('Quantity', 'Quantity', SchemaTypeCategory.Quantity, [], { fields: [ fieldSchema('value', 'Value', 'Numeric') ]} ),
    'text': typeSchema('text', 'Text', SchemaTypeCategory.Text),
    'tel': typeSchema('tel', 'Phone', SchemaTypeCategory.Text, ['text']),
    'email': typeSchema('email', 'Email', SchemaTypeCategory.Text, ['text'])
}

export const Units = [
    {
        unitCategory: { name: 'currency', side: LeftRight.Left }as UnitCategory,
        abbreviation: '$',
        key: 'US$',
        scopedShortAbreviation: '$',
        fullNameSingular:'Dollar',
        fullNamePlural: 'Dollars',
        isBase: true
    }
] as Unit[];

export const ValueTypes = Object
    .keys(BaseSchema)
    .filter(k => k !== 'Record' && k !== 'Numeric')
    .map(k => ({ code: k, description: BaseSchema[k].label}))