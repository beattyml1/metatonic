import {model} from "metatonic-core/src/index";
import {field} from "metatonic-core";
import {Person} from "./Person";
import {SchemaEntryType} from "metatonic-core";

class Currency {
}

@model('Home Owner')
export class ProspectiveBuyer {
    @field("Person", "Person Info", { canAdd: true})
    person: Person;

    @field("Currency", "MaxBudget", { min: '0' })
    maxBudget: Currency;
}