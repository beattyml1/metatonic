import {field, model} from "metatonic-core";
import {Address} from "./Address";

@model()
export class Person {
    @field("text", "First Name")
    firstName: string;

    @field("text", "Last Name")
    lastName: string;

    @field("Address", "Address", { canAdd: true })
    address: Address
}