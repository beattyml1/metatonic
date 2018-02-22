import {CustomValidation} from "../domain/Schema/CustomValidation";
import {Validation} from "../domain/Schema/Validation";

export type CustomValidationRegistration = { name: string, validate: Validation<any> }

export class CustomValidationsContext {
    private customValidations: { [name:string]: CustomValidationRegistration} = {};
    register(validation: CustomValidationRegistration | Validation<any>){
        if (typeof validation === "function") {
            this.customValidations[validation.name] = { name: validation.name, validate: validation };
        } else
          this.customValidations[validation.name] = validation as CustomValidationRegistration;
    }
    getValidation(name: string) {
        return this.customValidations[name];
    }
}

export const customValidations = new CustomValidationsContext();