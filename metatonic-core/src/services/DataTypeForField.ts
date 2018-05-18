import {SchemaField, SchemaType} from "../domain/Schema/Records";
import {Decimal} from "../data/Decimal";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {NumericTypeInfo} from "../domain/Schema/Numerics";
import {Integer} from "../data/Integer";
import {Float} from "../data/Float";
import {DateTimeTypeData, DateTimeTypes} from "../domain/Schema/DateTimeType";
import {Date} from "../data/Date";
import {TimeStamp} from "../data/TimeStamp";
import {DateTime} from "../data/DateTime";

export function dataTypeForField(field: SchemaField) {
    return dataTypeForType(field.type);
}
export function dataTypeForType(type: SchemaType) {
    if (type.category === SchemaTypeCategory.Numeric) {
        let numericParams = type.parameters as NumericTypeInfo;
        if (numericParams.isInteger) return Integer;
        if (numericParams.isFloating) return Float;
        return Decimal;
    } else
    if (type.category === SchemaTypeCategory.DateTime) {
        let dateTimeParams = type.parameters as DateTimeTypeData;
        if (dateTimeParams.type as any === DateTimeTypes.DateTime) return DateTime;
        if (dateTimeParams.type === DateTimeTypes.Date) return Date;
        if (dateTimeParams.type === DateTimeTypes.DateTime) return TimeStamp;
    }
}