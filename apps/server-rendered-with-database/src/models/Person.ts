import {field, model} from "metatonic-core/src/decorators/MetatonicModelDecorator";
import {Address} from "./Address";

@model()
export class Person {
    @field("text", "First Name")
    firstName: string;

    @field("text", "First Name")
    lastName: string;

    @field("text", "First Name", SchemaEntryType.selection, { canAdd: true })
    address: Address
}