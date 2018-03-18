import {
    NumericType, RecordSchemaType, SchemaField, SchemaRecordTypeParameters,
    SchemaType
} from "../domain/Schema/Records";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {NumericTypeInfo} from "../domain/Schema/Numerics";
import {Integer} from "../Data/Integer";
import {Float} from "../Data/Float";
import {Decimal} from "../Data/Decimal";
import {DateTimeType, DateTimeTypes} from "../domain/Schema/DateTimeType";
import {DateTimeTypeData} from "../index";
import {Date} from "../Data/Date";
import {DateTime} from "../Data/DateTime";
import {TimeStamp} from "../Data/TimeStamp";
import {QuantityTypeParameters} from "../domain/Schema/Quantities";
import {Quantity} from "../Data/Quantity";

export function getDefaultDataForField(field: SchemaField|FormSchema, forceSingle?: boolean) {
    if ((field as SchemaField).multiple && !forceSingle) {
        return getDefaultMultiEdit(field.type);
    }
    return getDefaultSingleEdit(field.type);
}

function getDefaultMultiEdit(type: SchemaType) {
    return [];
}

function getDefaultSingleEdit(type: SchemaType) {
    switch (type.category) {
        case SchemaTypeCategory.Record: return getDefaultSingleRecordEdit(type as RecordSchemaType);
        case SchemaTypeCategory.Numeric: return getDefaultSingleNumericEdit(type.parameters as NumericTypeInfo);
        case SchemaTypeCategory.Text: return "";
        case SchemaTypeCategory.DateTime: return getDefaultSingleDateEdit(type.parameters as DateTimeTypeData);
        case SchemaTypeCategory.Quantity: return getDefaultSingleQuantityEdit(type.parameters as QuantityTypeParameters);
        case SchemaTypeCategory.Boolean: return false;
        case SchemaTypeCategory.Code: return "";
        default: return "";
    }
}

function getDefaultSingleQuantityEdit(type: QuantityTypeParameters) {
    return {
        value: getDefaultSingleNumericEdit(type.numericFormat),
        unit: type.unitSource.unit || ""
    } as Quantity
}

function getDefaultSingleDateEdit(type: DateTimeTypeData) {
    switch (type.type) {
        case DateTimeTypes.Date: return Date.fromData("");
        case DateTimeTypes.DateTime: return DateTime.fromData("");
        case DateTimeTypes.TimeStamp: return TimeStamp.fromData("");
        default: return "";
    }
}

function getDefaultSingleRecordEdit(type: RecordSchemaType) {
    return type.parameters.fields.reduce((data, field) => Object.assign(data, { [field.name]: getDefaultDataForField(field) }), {});
}

function getDefaultSingleNumericEdit(type: NumericTypeInfo) {
    if (type.isInteger) return Integer.fromData("");
    return type.isFloating ? Float.fromData("") : Decimal.fromData("");
}