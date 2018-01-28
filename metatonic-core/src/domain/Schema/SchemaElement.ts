import {SchemaElementId} from "./ID";

export interface SchemaElement {
    id: SchemaElementId;
    name: string;
    label: string;
}