import {ValueDataType, ValueDataTypeConstructor} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";
import moment = require("moment");
import {Moment} from "moment";
import {BaseDateTimeData} from "./BaseDateTimeData";

const dataFormat = 'YYYY-MM-DD';
const displayFormat ='MMMM DD YYYY';
const editorFormat = 'MM/DD/YYYY';

export class Date extends BaseDateTimeData implements ValueDataType {
    static fromEditor(input: string, field: SchemaField) {
        return new Date(BaseDateTimeData.getMoment(input, editorFormat), {dataFormat, displayFormat, editorFormat})
    }

    static fromData(input: string, field: SchemaField) {
        return new Date(BaseDateTimeData.getMoment(input, dataFormat), {dataFormat, displayFormat, editorFormat});
    }
}