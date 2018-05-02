import {Validation, ValidationTime} from "../domain";
import {hasValue} from "../extensions/hasValue";
import {SchemaValidation} from "../domain";
import {whenTimeMatches} from "./ValidationUtils";
import {globalValidations} from "./CustomValidations";

function isNonEmptyComparable(value) {
    return value && value.hasValue && value.hasValue() && value.lessThan && value.greaterThan;
}

export const min: Validation = (value, field, validation, time, params) => {
    if(!isNonEmptyComparable(value)) return [];

    let min = params;
    let minVal = value.constructor.fromData(min);

    return hasValue(min) && value.lessThan(minVal) ? [`${field.label} must be greater than ${min}`] : []
}

export const max: Validation = (value, field, validation, time, params) => {
    if (!isNonEmptyComparable(value)) return [];

    let max = params;
    let maxVal = value.constructor.fromData(max);

    return hasValue(max) && value.greaterThan(maxVal) ? [`${field.label} must be greater than ${max}`] : []
}
export const required: Validation = (value, field, validation, time, params) =>  {
    let required = params;

    let isValueType = value && value.hasValue;

    let $hasValue = isValueType ? value.hasValue() : hasValue(value);

    return required && !$hasValue ? [`${field.label} is required`] : [];
}

export const maxLength: Validation = (value, field, validation, time, params) =>  {
    if (!(typeof value === "string")) return [];

    let maxLength = params;

    let length = value ? value.length : 0;

    return maxLength && length > maxLength ? [`${field.label} must be shorter than ${maxLength} characters`] : [];
}

export const regexValidaiton: Validation<any> = (value, field, validation, time, params) =>  {
    if (!(typeof value === "string")) return [];

    let regex = params;
    let matches = val => new RegExp(regex).test(val);
    let message = typeof params.message === "string" ? () => params.message :
                  typeof params.message === "function" ? params.message :
                      () => `${field.label} must match`

    return regex && !matches(value) ? [message(field, value)] : [];
}


[ min, max, maxLength, required ].map(whenTimeMatches).forEach(x => globalValidations.register(x));