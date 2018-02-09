import {field} from "../../../metatonic-core/src/decorators/MetatonicModelDecorator";
import {SchemaEntryType} from "../../../metatonic-core/src/domain/Schema/SchemaEnums";

export class Address {
    @field("text", "Address Line 1")
    address1: string;

    @field("text", "Address Line 2")
    address2: string;

    @field("text", "City")
    city: string;

    @field("State", "State", SchemaEntryType.selection)
    city: string;

    @field("ZipCode", "Zip Code")
    zipCode: string;
}