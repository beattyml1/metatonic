import {Validation, ValidationTime} from "../domain";
import {SchemaValidation} from "../domain";
import {SchemaField} from "../domain/Schema/Records";
import {ValidationResults} from "../domain/contracts/Validation";

function validateOnTimeMatch(validation: SchemaValidation, time: ValidationTime, validate: Validation, value, field: SchemaField, params): ValidationResults {
    if (!validation.time || time >= validation.time)
        return validate(value, field, validation, time, params);
    else return [];
}

export const whenTimeMatches: (v: Validation) => { name, validate: Validation } =
    (v: Validation) => {
        return {
            name: v.name,
            validate: (value, field: SchemaField, validation: SchemaValidation, time: ValidationTime, params) => {
                return validateOnTimeMatch(validation, time, v, value, field, params)
            }
        }
    }
