import {SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
import {FormSchema} from "../src/domain/Schema/RootSchemas";
import {QuantityTypeParameters} from "../src/domain/Schema/Quantities";
import {DateTimeTypes} from "../src/domain/Schema/DateTimeType";
import {fieldSchema, recordSchema, typeSchema} from "./TestUtils";


export const exampleSchema = {
    id: 'aa',
    name: 'a',
    label: 'A',
    typeName: 'Home',
    type: null as any,
    validations:[],
    types: {
        'Home': recordSchema('Home', 'Home', [
            fieldSchema('owners', 'Owners', 'Person', {multiple: true}),
            fieldSchema('address', 'Address', 'Address'),
            fieldSchema('askingPrice', 'Asking Price', 'Dollars'),
            fieldSchema('datePutOnSale', 'Date Put On Sale', 'date'),
            fieldSchema('numberOfBedRooms', 'Bed Rooms', 'Integer', { min: "0" })
        ]),
        'Person': recordSchema('Person', 'Person', [
            fieldSchema('fullName', 'Full Name', 'text'),
            fieldSchema('phone', 'Phone Number', 'tel')
        ]),
        'Address': recordSchema('Address', 'Address', [
            fieldSchema('address1', 'Address 1', 'text'),
            fieldSchema('address2', 'Address 2', 'text'),
            fieldSchema('city', 'City', 'text'),
            fieldSchema('state', 'State', 'text', {maxLength:2}),
            fieldSchema('zip', 'Zip', 'text'),
        ]),
        'Record': recordSchema('Record', 'Record', []),
        'Integer': typeSchema('Integer', 'Integer', SchemaTypeCategory.Numeric, undefined, {isInteger:true, isFloating: false }),
        'date': typeSchema('date', "Date", SchemaTypeCategory.DateTime, undefined, {type:DateTimeTypes.Date, params: { } }),
        'Dollars': typeSchema('Dollars', 'Dollars', SchemaTypeCategory.Quantity, [
            'Currency'
        ], { unitSource: { unitKey: 'dollars', unitCategoryName: 'currency' }, numericFormat: {}} as any as QuantityTypeParameters),
        'Numeric': typeSchema('Numeric', 'Numeric', SchemaTypeCategory.Numeric, []),
        'Currency': typeSchema('Dollars', 'Dollars', SchemaTypeCategory.Quantity, undefined, { unitSource: { unitCategoryName: 'currency' }, numericFormat: {fixedDecimalDigits: 2, isFloating: false, isInteger: false}} as QuantityTypeParameters),
        'text': typeSchema('text', 'Text', SchemaTypeCategory.Text),
        'tel': typeSchema('tel', 'Phone', SchemaTypeCategory.Text, ['text'])
    }
} as FormSchema;