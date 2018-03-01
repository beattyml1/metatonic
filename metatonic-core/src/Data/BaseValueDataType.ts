import {ComparableValueDataType, ValueDataType} from "./BaseDataTypes";
import {hasValue} from "../extensions/hasValue";
import {parse} from "ts-node";

export function createValueStoreDataType<T>(parse: (inputString: string, format?: string) => T, format: (val: T, format?: string) => string) {
    return class BaseValueDataType implements ComparableValueDataType {
        value: T|null;

        static fromData(value: string) {
            let data = new BaseValueDataType();
            data.value = hasValue(value) ? parse(value) : null;
            return data;
        }

        static fromEditor(value: string) {
            let data = new BaseValueDataType();
            data.value = hasValue(value) ? parse(value) : null;
            return data;
        }

        toDataString(): string {
            return hasValue(this.value) ? format(this.value) : "";
        }

        toDisplayString(): string {
            return hasValue(this.value) ? format(this.value) : "";
        }

        toEditorString(): string {
            return hasValue(this.value) ? format(this.value) : "";
        }

        format(formatString?: string): string {
            return hasValue(this.value) ? format(this.value, formatString) : "";
        }

        hasValue() {
            return hasValue(this.value);
        }

        equals(x: string | ValueDataType): boolean|null {
            if (typeof x === "string")
                return this.toDataString() === x;
            else if (x['toDataString'] !== undefined)
                return this.toDataString() === (x as BaseValueDataType).toDataString();
            else throw "Can't compare data types"
        }

        lessThan(x: string | ValueDataType): boolean|null {
            if (!hasValue(this.value)) return null;
            let right = this.asDataType(x);
            if (!hasValue(right.value)) return null;
            return this.value < right.value;
        }

        greaterThan(x: string | ValueDataType): boolean|null {
            if (!hasValue(this.value)) return null;
            let right = this.asDataType(x);
            if (!hasValue(right.value)) return null;
            return this.value > right.value;
        }

        private asDataType(x: string | ValueDataType) {
            return typeof x === "string" ? BaseValueDataType.fromData(x) : x as BaseValueDataType;
        }
    }
}