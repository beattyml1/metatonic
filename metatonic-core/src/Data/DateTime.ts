import {ValueDataType, ValueDataTypeConstructor} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";
import moment = require("moment");
import {Moment} from "moment";
import {BaseDateTimeData} from "./BaseDateTimeData";
import {hasValue} from "../extensions/hasValue";

export class DateTime  extends BaseDateTimeData implements ValueDataType {
    static dataFormat(showSeconds) {
        return `YYYY-MM-DDTHH:mm${showSeconds?':ss':''}`
    }

    static displayFormat(showSeconds): string {
        return `MMMM DD YYYY HH:mm${showSeconds?':ss':''}`;
    }

    static editorFormat(showSeconds): string {
        return `MM/DD/YYYY HH:mm${showSeconds ? ':ss' : ''}`;
    }

    static formats(showSeconds) {
        return {dataFormat:DateTime.dataFormat(showSeconds), displayFormat: DateTime.displayFormat(showSeconds), editorFormat: DateTime.editorFormat(showSeconds)}
    }

    static hasSeconds(input: string) {
        if (!hasValue(input)) return false;
        return input.split(':').length >= 2
    }

    static fromEditor(input: string, field: SchemaField) {
        let formats = DateTime.formats(DateTime.hasSeconds(input));
        return new DateTime(BaseDateTimeData.getMoment(input, formats.editorFormat), formats)
    }

    static fromData(input: string, field: SchemaField) {
        let formats = DateTime.formats(DateTime.hasSeconds(input));
        return new DateTime(BaseDateTimeData.getMoment(input, formats.dataFormat), formats);
    }
}