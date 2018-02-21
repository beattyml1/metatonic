import {SchemaElement} from "./SchemaElement";
import {Maybe} from "../../CoreTypes";
import {SchemaEntryType} from "./SchemaEnums";

export interface SchemaFieldInfo extends SchemaElement {
    typeName: string;
    uiUniqueId: string;
    required?: boolean;
    maxLength?: Maybe<number>;
    max?: Maybe<number>;
    min?: Maybe<number>;
    entryType?: SchemaEntryType;
    multiple?: boolean;
    canAdd?: boolean;
    canEditSelection?: boolean;
    uiControlPreference?: string;
}