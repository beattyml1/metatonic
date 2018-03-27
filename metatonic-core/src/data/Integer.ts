import {ValueDataType} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";

export class Integer extends createValueStoreDataType<number>(s => parseInt(s), i => i.toString())  implements ValueDataType {

}