import {model} from "metatonic-core";
import {field, list} from "metatonic-core";
import {Homeowner} from "./Homeowner";
import {SchemaEntryType} from "metatonic-core";
import {Address} from "./Address";
import {select} from "metatonic-core";

class Currency {
}

@model()
export class House {
    @field("Currency", "Asking Price", {min: '0', max: '100000000'})
    askingPrice: Currency;

    @field("Address", "Address", { canAdd: true })
    address: Address;

    @list("Homeowner", "Homeowners", { canAdd: true })
    homeowners: Homeowner[];
}