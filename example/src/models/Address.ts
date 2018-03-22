import {field, model, select} from "metatonic-core";
import {SchemaEntryType} from "metatonic-core";

@model()
export class Address {
    @field("text", "Address Line 1")
    address1: string;

    @field("text", "Address Line 2")
    address2: string;

    @field("text", "City")
    city: string;

    @select("State", "State")
    state: string;

    @field("ZipCode", "Zip Code")
    zipCode: string;
}