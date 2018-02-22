import {SchemaElementId} from "./ID";

export interface NamedAndLabeled {
    id: SchemaElementId;
    name: string;
    label: string;
}