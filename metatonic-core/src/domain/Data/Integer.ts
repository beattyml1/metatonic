import {ValueDataType} from "./BaseDataTypes";
import {SchemaField} from "../Schema/Records";

export class Integer implements ValueDataType {
    constructor(stringValue: string, field?: SchemaField) {

    }
    toDataString(): string {
        throw new Error("Method not implemented.");
    }

    toDisplayString(): string {
        throw new Error("Method not implemented.");
    }

    toEditorString(): string {
        throw new Error("Method not implemented.");
    }
}