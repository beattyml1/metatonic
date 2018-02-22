import {NamedAndLabeled} from "./NamedAndLabeled";
import {CustomValidation} from "./CustomValidation";

export interface SchemaElement extends NamedAndLabeled{
    customValidations: CustomValidation[]
}