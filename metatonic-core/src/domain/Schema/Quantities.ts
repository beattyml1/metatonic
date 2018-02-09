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
    unitCategory: UnitCategory;
    key: string;
    abbreviation: string;
    scopedShortAbreviation: string;
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
    unitCategory?: UnitCategoryData;
    unitGroup?: string;
}