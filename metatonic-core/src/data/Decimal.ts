import {ValueDataType} from "./BaseDataTypes";
import {SchemaField} from "../domain/Schema/Records";
import {createValueStoreDataType} from "./BaseValueDataType";
import {hasValue} from "../extensions/hasValue";
import {Maybe, Nullable} from "../CoreTypes";

type DecimalData = {
    leftInt:number, rightInt:number, rightZeros:number
}

function compare(left: DecimalData, right: DecimalData): number|null {
    if (left === null || right === null) return null;
    if (left.leftInt === right.leftInt) {
        if (left.rightZeros === right.rightZeros) {
            return left.rightInt - right.rightInt;
        } else {
            return right.rightZeros - left.rightZeros;
        }
    } else {
        return left.leftInt - right.leftInt;
    }
}

const parseDecimal = (inputString: string) => {
    if (!hasValue(inputString)) return null;
    let parts = inputString.split('.');
    let leftStr = parts[0] || "0";
    let rightStr = parts[1] || "0";
    let leftInt = parseInt(leftStr);
    let rightInt = parseInt(rightStr);
    let rightZeros = rightStr.split('').findIndex(c => c !== '0');
    return {
        leftInt, rightInt, rightZeros
    }
}

const formatDecimal = (val:DecimalData|null) => {
    return hasValue(val) ? `${val.leftInt.toString()}.${'0'.repeat(val.rightZeros)}${val.rightInt}` : "";
}

export class Decimal extends createValueStoreDataType<DecimalData|null>(parseDecimal, formatDecimal) implements ValueDataType {
    static fromData(value: string, field?: SchemaField) {
        return super.fromData(value, field, Decimal);
    }

    static fromEditor(value: string, field?: SchemaField) {
        return super.fromEditor(value, field, Decimal);
    }

    compare(x: string | ValueDataType) {
        if (!hasValue(this.value)) return null;
        let right = super.__asDataType(x).value;
        if (!hasValue(right)) return null;
        return compare(this.value, right);
    }

    lessThan(x: string | ValueDataType): boolean|null {
        let comparisonResult = this.compare(x);
        return comparisonResult === null ? null : comparisonResult < 0;
    }

    greaterThan(x: string | ValueDataType): boolean|null {
        let comparisonResult = this.compare(x);
        return comparisonResult === null ? null : comparisonResult > 0;
    }
}