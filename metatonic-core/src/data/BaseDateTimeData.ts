import {
    ComparableValueDataType, DefaultEmptyValueString, ValueDataType,
    ValueDataTypeConstructor
} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";
import moment = require("moment");
import {Moment} from "moment";
import {hasValue} from "../extensions/hasValue";


export type DateTimeType<T> = {
    formats(showSeconds): ValueFormats,
    hasSeconds(input: string): boolean
} & (new (moment:Moment|null, format: ValueFormats) => T)

export type ValueFormats = { dataFormat: string, displayFormat: string, editorFormat: string};

export class BaseDateTimeData implements ComparableValueDataType {
    constructor(public moment: Moment|null, public formats: ValueFormats){}

    toDataString(): string {
        if (!hasValue(this.moment)) return DefaultEmptyValueString;
        return this.moment.format(this.formats.dataFormat);
    }

    toDisplayString(): string {
        if (!hasValue(this.moment)) return DefaultEmptyValueString;
        return this.moment.format(this.formats.displayFormat);
    }

    toEditorString(): string {
        if (!hasValue(this.moment)) return DefaultEmptyValueString;
        return this.moment.format(this.formats.editorFormat);
    }

    format(formatString?: string | undefined): string {
        if (!hasValue(this.moment)) return DefaultEmptyValueString;
        return this.moment.format(formatString);
    }

    lessThan(x: string | ValueDataType): boolean|null {
        if (this.moment === null) return null;
        return this.moment.isBefore(this.getMomentOrString(x));
    }

    greaterThan(x: string | ValueDataType): boolean|null {
        if (this.moment === null) return null;
        return this.moment.isAfter(this.getMomentOrString(x));
    }

    equals(x: string | ValueDataType): boolean {
        let rightHasValue = this.argumentHasValue(x)
        if (this.moment === null) return !rightHasValue;
        if (this.moment && !rightHasValue) return false;

        return this.moment.isSame(this.getMomentOrString(x));
    }

    private argumentHasValue(x: string | ValueDataType) {
        return hasValue(x) && ((typeof x === "string") || (x['hasValue'] && x['hasValue']()));
    }

    getMomentOrString(x) {
        return typeof x === "string" ? x as string : x['moment'] as Moment;
    }

    hasValue(): boolean {
        return hasValue(this.moment);
    }

    static getMoment(input, format) {
        return hasValue(input) ? moment(input, format) : null;
    }
}