import {TextTypeParameters} from "./TextTypes";
import {QuantityTypeParameters} from "./Quantities";
import {DateTimeTypeData} from "./DateTimeType";
import {CodeDescriptionSelectionType} from "./ItemSelectionType";
import {DataTypes} from "./DataTypes";
import {SchemaElement} from "./SchemaElement";
import {SchemaTypeCategory} from "./SchemaEnums";
import {SchemaFieldInfo} from "./SchemaFieldInfo";
import {NumericTypeInfo} from "./Numerics";

export type SchemaRecordTypeParameters = {
    fields: SchemaField[];
}

export type SchemaField = SchemaFieldInfo & {
    type: SchemaType;
}

export type AnyTypeParameterType = TextTypeParameters | SchemaRecordTypeParameters | QuantityTypeParameters | DateTimeTypeData | CodeDescriptionSelectionType | NumericTypeInfo;

export type SchemaTypeInfo =  SchemaElement & {
    name: DataTypes|string;
    uiControlPreference?: string;
    category: SchemaTypeCategory;
    parentTypeNames: string[];
    parameters: SchemaRecordTypeParameters | DateTimeTypeData | QuantityTypeParameters | NumericTypeInfo | TextTypeParameters | CodeDescriptionSelectionType;
}

export type SchemaTypeGeneric<TCategory extends SchemaTypeCategory, TType extends AnyTypeParameterType> =  SchemaTypeInfo & {
    category: TCategory;
    parameters: TType;
}

export type RecordSchemaType = SchemaTypeGeneric<SchemaTypeCategory.Record, SchemaRecordTypeParameters>
export type DateTimeSchemaType = SchemaTypeGeneric<SchemaTypeCategory.DateTime, DateTimeTypeData>
export type QuantityType = SchemaTypeGeneric<SchemaTypeCategory.Quantity, QuantityTypeParameters>
export type NumericType = SchemaTypeGeneric<SchemaTypeCategory.Numeric, NumericTypeInfo>
export type TextType = SchemaTypeGeneric<SchemaTypeCategory.Text, TextTypeParameters>
export type CodeDescriptionType = SchemaTypeGeneric<SchemaTypeCategory.Code, CodeDescriptionSelectionType>
export type BooleanType = SchemaTypeGeneric<SchemaTypeCategory.Boolean, {}>

export type SchemaType = SchemaTypeInfo & (RecordSchemaType | DateTimeSchemaType | QuantityType | NumericType | TextType | CodeDescriptionType);

let x: SchemaType;

export type SelectableType =  CodeDescriptionSelectionType | SchemaRecordTypeParameters;

