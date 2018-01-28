

import {CustomValidation} from "./CustomValidation";

export class CustomValidationsContext {
    private customValidations: {[type: string]: { [field: string]: CustomValidation } } = {};
    addTypeValidation(type: string, valdiation: CustomValidation) {
        this.customValidations[type][""] = valdiation;
    }
    addFieldValidation(type: string, field: string, valdiation: CustomValidation) {
        this.customValidations[type][field] = valdiation;
    }

}