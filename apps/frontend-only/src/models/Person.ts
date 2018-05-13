import {field, model} from "metatonic-core";
import {Address} from "./Address";

@model()
export class Person {
    @field("text", "First Name")
    firstName: string;

    @field("text", "First Name")
    lastName: string;

    @field("text", "First Name", { canAdd: true })
    address: Address
}