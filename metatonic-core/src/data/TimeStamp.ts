import {ValueDataType} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import moment = require("moment");
import {BaseDateTimeData, ValueFormats} from "./BaseDateTimeData";
import {DateTime} from "./DateTime";
import {hasValue} from "../extensions/hasValue";

function TimeZone_fromFormat(input: string, format: (v:ValueFormats) => string) {
    let formats = TimeStamp.formats(DateTime.hasSeconds(input));
    return new TimeStamp(hasValue(input)? moment.parseZone(input, format(formats)) : null, formats);
}

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

    static fromEditor(input: string, field?: SchemaField) {
        return TimeZone_fromFormat(input, f => f.editorFormat);
    }

    static fromData(input: string, field?: SchemaField) {
        return TimeZone_fromFormat(input, f => f.dataFormat);
    }
}