import {Maybe} from "CoreTypes";
import {HtmlInputType, HtmlTextInputType} from "../Html/HtmlInputType";

export type TextTypeParameters = {
    type: TextTypes
    customMask: string;
    includeMask: boolean;
    inputType: HtmlInputType;
    maxLength?: number;
}

export enum TextTypes {
    email = "email",
    telephone = "telephone",
    freeText = "freeText",
    url = "url",
    ssn = "ssn",
    maskedText = "maskedText"
}