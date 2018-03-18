import {SchemaType} from "../domain/Schema/Records";
import {Validation} from "../domain/Schema/Validation";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {QuantityTypeParameters} from "../domain/Schema/Quantities";
import {hasValue} from "../extensions/hasValue";
import {ComparableValueDataType} from "../Data/BaseDataTypes";

function isNonEmptyComparable(value) {
    return value && value.hasValue && value.hasValue() && value.lessThan && value.greaterThan;
}

export const min: Validation = (value, type, field) => {
    if(!isNonEmptyComparable(value)) return [];

    let min = field.min;
    let minVal = value.constructor.fromData(min);

    return hasValue(min) && value.lessThan(minVal) ? [`${field.label} must be greater than ${min}`] : []
}

export const max: Validation = (value, type, field) => {
    if (!isNonEmptyComparable(value)) return [];

    let max = field.max;
    let maxVal =value.constructor.fromData(max);

    return hasValue(max) && value.greaterThan(maxVal) ? [`${field.label} must be greater than ${max}`] : []
}
export const required: Validation = (value, type, field) =>  {
    let required = field.required;

    let isValueType = value && value.hasValue;

    let $hasValue = isValueType ? value.hasValue() : hasValue(value);

    return required && !$hasValue ? [`${field.label} is required`] : [];
}

export const maxLength: Validation = (value, type, field) =>  {
    if (!(typeof value === "string")) return [];

    let maxLength = field.maxLength;

    let length = value ? value.length : 0;

    return maxLength && length > maxLength ? [`${field.label} must be shorter than ${maxLength} characters`] : [];
}

export const regexValidaiton: Validation<any> = (value, type, field, config, params) =>  {
    if (!(typeof value === "string")) return [];

    let regex = params.regex;
    let matches = val => new RegExp(regex).test(val);
    let message = typeof params.message === "string" ? () => params.message :
                  typeof params.message === "function" ? params.message :
                      () => `${field.label} must match`

    return regex && !matches(value) ? [message(field, value)] : [];
}

export const builtInValidations:  Validation[] = [
    min, max, maxLength, required
]