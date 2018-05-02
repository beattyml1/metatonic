import {Validation, ValidationTime} from "../domain";
import {SchemaValidation} from "../domain";

function validateOnTimeMatch(validation: SchemaValidation, time: ValidationTime, validate: Validation): Validation {
    if (!validation.time || time >= validation.time)
        return validate;
    else return () => [];
}

export const whenTimeMatches: (v: Validation) => Validation =
    (v: Validation) =>
        (value, field, validation, time, params) =>
            validateOnTimeMatch(validation, time, v)(value, field, validation, time, params)