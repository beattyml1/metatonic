
import {globalValidations} from "../services/CustomValidations";
import {Validation} from "../domain/contracts/Validation";

export function validation(name?) {
    return (target: Validation) => {
        globalValidations.register({ name: name||target.name, validate: target })
    }
}