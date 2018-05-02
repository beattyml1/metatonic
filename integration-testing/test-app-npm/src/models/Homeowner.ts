import {model} from "metatonic-core";
import {field} from "metatonic-core";
import {Person} from "./Person";
import {SchemaEntryType} from "metatonic-core";

@model('Home Owner')
export class Homeowner {
    @field("Person", "Person Info", { canAdd: true})
    person: Person;
}