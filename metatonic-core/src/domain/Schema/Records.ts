import {TextTypeParameters} from "./TextTypes";
import {QuantityTypeParameters} from "./Quantities";
import {DateTimeTypeData} from "./DateTimeType";
import {CodeDescriptionSelectionType, ItemSelectionType} from "./ItemSelectionType";
import {DataTypes} from "./DataTypes";
import {SchemaElement} from "./SchemaElement";
import {SchemaTypeCategory} from "./SchemaEnums";
import {SchemaFieldInfo} from "./SchemaFieldInfo";
import {NumericTypeInfo} from "./Numerics";

export interface SchemaRecordTypeParameters extends ItemSelectionType<any> {
    fields: SchemaField[];
}

export interface SchemaField extends SchemaFieldInfo {
    type: SchemaType;
}

export type AnyTypeParameterType = TextTypeParameters | SchemaRecordTypeParameters | QuantityTypeParameters | DateTimeTypeData | CodeDescriptionSelectionType | NumericTypeInfo | {};

export interface SchemaTypeInfo extends SchemaElement {
    name: DataTypes|string;
    uiControlPreference?: string;
    category: SchemaTypeCategory;
    parentTypeNames: string[];
    parameters: AnyTypeParameterType
}

// TODO: Refactor this over complicate type stuff

export interface SchemaTypeGeneric<TCategory extends SchemaTypeCategory, TType extends AnyTypeParameterType> extends  SchemaTypeInfo {
    category: TCategory;
    parameters: TType;
}

export interface RecordSchemaType extends SchemaTypeGeneric<SchemaTypeCategory.Record, SchemaRecordTypeParameters>{}
export interface DateTimeSchemaType extends SchemaTypeGeneric<SchemaTypeCategory.DateTime, DateTimeTypeData> {}
export interface QuantityType extends SchemaTypeGeneric<SchemaTypeCategory.Quantity, QuantityTypeParameters> {}
export interface NumericType extends SchemaTypeGeneric<SchemaTypeCategory.Numeric, NumericTypeInfo> {}
export interface TextType extends SchemaTypeGeneric<SchemaTypeCategory.Text, TextTypeParameters> {}
export interface CodeDescriptionType extends SchemaTypeGeneric<SchemaTypeCategory.Code, CodeDescriptionSelectionType> {}
export interface BooleanType extends SchemaTypeGeneric<SchemaTypeCategory.Boolean, {}> {}

export interface SchemaType extends SchemaTypeInfo{} //& (RecordSchemaType | DateTimeSchemaType | QuantityType | NumericType | TextType | CodeDescriptionType | BooleanType);

export type SelectableType =  CodeDescriptionSelectionType | SchemaRecordTypeParameters;

