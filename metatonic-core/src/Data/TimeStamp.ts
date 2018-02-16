import {ValueDataType, ValueDataTypeConstructor} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";
import moment = require("moment");
import {Moment} from "moment";
import {BaseDateTimeData} from "./BaseDateTimeData";
import {DateTime} from "./DateTime";

export class TimeStamp  extends BaseDateTimeData implements ValueDataType {
    static dataFormat(showSeconds) {
        return `YYYY-MM-DDTHH:mm${showSeconds?':ssZ':''}`
    }

    static formats(showSeconds) {
        return {dataFormat:TimeStamp.dataFormat(showSeconds), displayFormat: DateTime.displayFormat(showSeconds), editorFormat: DateTime.editorFormat(showSeconds)}
    }

    static hasSeconds(input: string) {
        return input.split(':').length >= 2
    }

    static fromEditor(input: string, field: SchemaField) {
        let formats = TimeStamp.formats(DateTime.hasSeconds(input));
        return new TimeStamp(moment.parseZone(input, formats.editorFormat), formats)
    }

    static fromData(input: string, field: SchemaField) {
        let formats = TimeStamp.formats(DateTime.hasSeconds(input));
        return new TimeStamp(moment.parseZone(input, formats.dataFormat), formats);
    }
}