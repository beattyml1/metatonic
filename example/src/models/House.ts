import {model} from "metatonic-core";
import {field, list} from "metatonic-core";
import {Homeowner} from "./Homeowner";
import {SchemaEntryType} from "metatonic-core";
import {Address} from "./Address";
import {Quantity} from "metatonic-core";

@model()
export class House {
    @field("Address", "Address", SchemaEntryType.selection, { canAdd: true })
    address: Address;

    @field("Currency", "Asking Price", SchemaEntryType.entry, {min: 0, max: 100000000})
    askingPrice: Quantity;

    @list("Homeowner", "Homeowners", SchemaEntryType.entry, { canAdd: true })
    homeowners: Homeowner[];
}