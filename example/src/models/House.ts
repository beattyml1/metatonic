import {model} from "metatonic-core/src/index";
import {field, list} from "../../../metatonic-core/src/decorators/MetatonicModelDecorator";
import {Homeowner} from "./Homeowner";
import {SchemaEntryType} from "../../../metatonic-core/src/domain/Schema/SchemaEnums";
import {Address} from "./Address";

@model()
export class House {
    @field("Address", "Address", SchemaEntryType.selection, { canAdd: true })
    address: Address;

    @field("Currency", "Asking Price", SchemaEntryType.entry, {min: 0, max: 100000000})
    askingPrice: Currency;

    @list("Homeowner", "Homeowners", SchemaEntryType.entry, { canAdd: true })
    homeowners: Homeowner[];
}