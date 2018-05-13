import {model} from "metatonic-core/src/index";
import {field} from "../../../metatonic-core/src/decorators/MetatonicModelDecorator";
import {Person} from "./Person";
import {SchemaEntryType} from "../../../metatonic-core/src/domain/Schema/SchemaEnums";

@model({label: 'Home Owner'})
export class Homeowner {
    @field("Person", "Person Info", SchemaEntryType.selection, { canAdd: true})
    person: Person;
}