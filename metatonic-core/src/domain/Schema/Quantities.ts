import {NumericTypeInfo} from "./Numerics";

export enum LeftRight { Left, Right}

export type UnitCategory = {
    name: string;
    side: LeftRight;
}

export type UnitCategoryData = UnitCategory & {
    units: Unit[];
}

export type MeasurementSystem = {
    name: string;
    isBase: boolean;
}

export type Unit = {
    category: UnitCategory;
    key: string;
    abbreviation: string;
    scopedShortAbbreviation: string;
    fullNameSingular: string;
    fullNamePlural: string;
    measurementSystem: MeasurementSystem;
    conversionFactor: number;
    systemConversionFactor: number;
    isBase: boolean;
}

export type QuantityTypeParameters = {
    numericFormat: NumericTypeInfo;
    unitSource: UnitSourceSpec;
    shouldConvertLocal: number;
    inputTypeHint: "maskedText" | "multiPart";
}

export type UnitSourceSpec = {
    unit?: Unit;
    unitCategoryName?: string;
    unitCategory?: UnitCategory;
    unitGroup?: string;
    unitKey?: string;
    units?: Unit[];
    measurementSystemName?: string;
    groupName?: string;
}