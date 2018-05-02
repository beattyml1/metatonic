

import {ValidationMessageDetailed} from "../contracts/Validation";

export type FieldState = {
    validationMessages: ValidationMessageDetailed[];
    showLoader?: boolean;
    children: { [property: string]: FieldState; [property: number]: FieldState };
}