import {NamedAndLabeled} from "./NamedAndLabeled";
import {SchemaValidation} from "./SchemaValidation";

export interface SchemaElement extends NamedAndLabeled{
    validations: SchemaValidation[]
}