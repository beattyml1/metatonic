import {ValueDataType} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";

export class Float extends createValueStoreDataType(x => parseFloat(x), x => {
    return x.toString();
})implements ValueDataType {

}