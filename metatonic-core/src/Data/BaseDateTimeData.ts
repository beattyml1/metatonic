import {ValueDataType, ValueDataTypeConstructor} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";
import moment = require("moment");
import {Moment} from "moment";

export class BaseDateTimeData implements ValueDataType {
    constructor(public moment: Moment, public formats: { dataFormat: string, displayFormat: string, editorFormat: string}){}

    toDataString(): string {
        return this.moment.format(this.formats.dataFormat);
    }

    toDisplayString(): string {
        return this.moment.format(this.formats.displayFormat);
    }

    toEditorString(): string {
        return this.moment.format(this.formats.editorFormat);
    }

    format(formatString?: string | undefined): string {
        return this.moment.format(formatString);
    }
}