

import {ValidationMessageDetailed} from "../contracts/Validation";

export interface FieldState {
    validationMessages: ValidationMessageDetailed[];
    showLoader?: boolean;
    children: { [property: string]: FieldState; [property: number]: FieldState };
}