import {ValueDataType, ValueDataTypeConstructor} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";
import moment = require("moment");
import {Moment} from "moment";
import {BaseDateTimeData, ValueFormats} from "./BaseDateTimeData";
import {DateTime} from "./DateTime";
import {hasValue} from "../extensions/hasValue";

export class TimeStamp  extends BaseDateTimeData implements ValueDataType {
    static dataFormat(showSeconds) {
        return `YYYY-MM-DDTHH:mm${showSeconds?':ssZ':''}`
    }

    static formats(showSeconds) {
        return {dataFormat:TimeStamp.dataFormat(showSeconds), displayFormat: DateTime.displayFormat(showSeconds), editorFormat: DateTime.editorFormat(showSeconds)}
    }

    static hasSeconds(input: string) {
        if (!hasValue(input)) return false;
        return input.split(':').length >= 2
    }

    private static fromFormat(input: string, format: (v:ValueFormats) => string) {
        let formats = TimeStamp.formats(DateTime.hasSeconds(input));
        return new TimeStamp(hasValue(input)? moment.parseZone(input, format(formats)) : null, formats);
    }

    static fromEditor(input: string, field: SchemaField) {
        return TimeStamp.fromFormat(input, f => f.editorFormat);
    }

    static fromData(input: string, field: SchemaField) {
        return TimeStamp.fromFormat(input, f => f.dataFormat);
    }
}