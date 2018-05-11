import {Validation} from "../domain/contracts/Validation";

export type ValidationRegistration = { name: string, validate: Validation<any> }

export interface ValidationsContext {
    register(validation: ValidationRegistration | Validation<any>);
    getValidation(name: string): ValidationRegistration;
}

class ValidationsContextInstance implements ValidationsContext {
    __customValidations: { [name:string]: ValidationRegistration} = {};
    register(validation: ValidationRegistration | Validation<any>){
        if (typeof validation === "function") {
            this.__customValidations[validation.name] = { name: validation.name, validate: validation };
        } else
          this.__customValidations[validation.name] = validation as ValidationRegistration;
    }
    getValidation(name: string) {
        return this.__customValidations[name];
    }
}

export const newValidationContext = () => new ValidationsContextInstance() as ValidationsContext
export const globalValidations = newValidationContext();