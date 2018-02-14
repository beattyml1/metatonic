import {ValueDataType} from "./BaseDataTypes";

export function createValueStoreDataType<T>(parse: (inputString: string, format?: string) => T, format: (val: T, format?: string) => string) {
    return class BaseValueDataType implements ValueDataType {
        value: T;

        static fromData(value: string) {
            let data = new BaseValueDataType();
            data.value = parse(value);
            return data;
        }

        static fromEditor(value: string) {
            let data = new BaseValueDataType();
            data.value = parse(value);
            return data;
        }

        toDataString(): string {
            return format(this.value);
        }

        toDisplayString(): string {
            return format(this.value);
            ;
        }

        toEditorString(): string {
            return format(this.value);
        }

        format(formatString?: string): string {
            return format(this.value, formatString);
        }
    }
}