import {SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
import {
    AnyTypeParameterType,
    RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType,
    SchemaTypeGeneric
} from "../src/domain/Schema/Records";
import {FormSchema} from "../src/domain/Schema/RootSchemas";
import {OptionalProps} from "../src/CoreTypes";
import {QuantityTypeParameters} from "../src/domain/Schema/Quantities";
import {DateTimeTypes} from "../src/domain/Schema/DateTimeType";

let _id = 0;
let id = () => (_id++).toString();

export function record(name: string, label: string, fields: SchemaField[], optionalProps?: OptionalProps<SchemaType>) {
    return Object.assign({
        name,
        label,
        parameters: { fields },
        id: id(),
        category: SchemaTypeCategory.Record,
        parentTypeNames: [],
        customValidations:[]
    }, optionalProps) as RecordSchemaType;
}

export function field(name: string, label: string, typeName: string, optionalProps?: OptionalProps<SchemaField>) {
    return Object.assign({}, { name, label, typeName, id: id(), customValidations:[] }, optionalProps) as SchemaField;
}

export function type(name: string, label: string, category: SchemaTypeCategory, parentTypeNames?: any[], parameters?: AnyTypeParameterType) {
    return Object.assign({
        name,
        label,
        id: id(),
        category,
        parentTypeNames: parentTypeNames||[],
        parameters,
        customValidations:[],
    }) as RecordSchemaType;
}

export const exampleSchema = {
    id: 'aa',
    name: 'a',
    label: 'A',
    typeName: 'Home',
    type: null as any,
    customValidations:[],
    types: {
        'Home': record('Home', 'Home', [
            field('owners', 'Owners', 'Person', {multiple: true}),
            field('address', 'Address', 'Address'),
            field('askingPrice', 'Asking Price', 'Dollars'),
            field('datePutOnSale', 'Date Put On Sale', 'Date'),
            field('numberOfBedRooms', 'Bed Rooms', 'Integer', { min: "0" })
        ]),
        'Person': record('Person', 'Person', [
            field('fullName', 'Full Name', 'text'),
            field('phone', 'Phone Number', 'tel')
        ]),
        'Address': record('Address', 'Address', [
            field('address1', 'Address 1', 'text'),
            field('address2', 'Address 2', 'text'),
            field('city', 'City', 'text'),
            field('state', 'State', 'text'),
            field('zip', 'Zip', 'text'),
        ]),
        'Integer': type('Integer', 'Integer', SchemaTypeCategory.Numeric, [], {isInteger:true, isFloating: false }),
        'Date': type('Date', "Date", SchemaTypeCategory.DateTime, [], {type:DateTimeTypes.Date, params: { } }),
        'Dollars': type('Dollars', 'Dollars', SchemaTypeCategory.Quantity, [
            'Currency'
        ], { unitSource: { unit: 'dollars'}, numericFormat: {}} as any as QuantityTypeParameters),
        'Currency': type('Dollars', 'Dollars', SchemaTypeCategory.Quantity, [
            'Currency'
        ], { unitSource: { unitCategory: {name: 'currency'} }, numericFormat: {fixedDecimalDigits: 2, isFloating: false, isInteger: false}} as QuantityTypeParameters),
        'text': type('text', 'Text', SchemaTypeCategory.Text),
        'tel': type('tel', 'Phone', SchemaTypeCategory.Text, ['text'])
    }
} as FormSchema;