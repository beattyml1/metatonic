import {NamedAndLabeled} from "./NamedAndLabeled";
import {SchemaElementId} from "./ID";

export type CustomValidation ={
    id: SchemaElementId;
    name: string;
    label: string;
    parameters: any;
}