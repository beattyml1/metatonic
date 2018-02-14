import {ValueDataType} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";

export class Decimal extends createValueStoreDataType<{
    leftInt, rightInt, rightZeros
}>(
    (inputString) => {
        let parts = inputString.split('.');
        let leftStr = parts[0] || "0";
        let rightStr = parts[1] || "0";
        let leftInt = parseInt(leftStr);
        let rightInt = parseInt(rightStr);
        let rightZeros = rightStr.split('').findIndex(c => c !== '0');
        return {
            leftInt, rightInt, rightZeros
        }
    }, (val) => {
        return `${val.leftInt.toString()}.${'0'.repeat(val.rightZeros)}${val.rightInt}`
    }
) implements ValueDataType {

}