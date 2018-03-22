import {model} from "metatonic-core";
import {field} from "metatonic-core";
import {Person} from "./Person";
import {SchemaEntryType} from "metatonic-core";
import {Quantity} from "metatonic-core";

@model({label: 'Home Owner'})
export class ProspectiveBuyer {
    @field("Person", "Person Info", SchemaEntryType.selection, { canAdd: true})
    person: Person;

    @field("Currency", "MaxBudget", SchemaEntryType.entry, { min: 0 })
    maxBudget: Quantity;
}