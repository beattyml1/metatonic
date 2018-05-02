import {SchemaValidation} from "../domain";
import {Validation} from "../domain/contracts/Validation";

export type ValidationRegistration = { name: string, validate: Validation<any> }

export class ValidationsContext {
    private customValidations: { [name:string]: ValidationRegistration} = {};
    register(validation: ValidationRegistration | Validation<any>){
        if (typeof validation === "function") {
            this.customValidations[validation.name] = { name: validation.name, validate: validation };
        } else
          this.customValidations[validation.name] = validation as ValidationRegistration;
    }
    getValidation(name: string) {
        return this.customValidations[name];
    }
}

export const globalValidations = new ValidationsContext();