
import {
    ComparableValueDataType, ComparableValueDataTypeConstructor, ValueDataType,
    ValueDataTypeConstructor
} from "../src/Data/BaseDataTypes";
import {SchemaField} from "../src/domain/Schema/Records";

declare var require;
declare var it;
declare var expect;


export function valueTypeTests(
    dataType: ComparableValueDataTypeConstructor & (new (...args) => ValueDataType&ComparableValueDataType),
    dataInputString: string,
    editorInputString?:string,
    smaller?: string, bigger?: string) {
    it('should convert from data string and back', () => {
        let val = dataType.fromData(dataInputString, <SchemaField>{}) as ValueDataType;

        expect(val.toDataString()).toBe(dataInputString);
    })
    it('should convert from editor string and back', () => {
        let val = dataType.fromEditor(editorInputString||dataInputString, <SchemaField>{}) as ValueDataType;

        expect(val.toEditorString()).toBe(editorInputString||dataInputString);
    })

    it('should convert from editor, to data and then back to editor', () => {
        let fromEdit = dataType.fromEditor(editorInputString||dataInputString, <SchemaField>{}) as ValueDataType;
        let dataString = fromEdit.toDataString();
        let fromData = dataType.fromData(dataString, <SchemaField>{}) as ValueDataType;
        let editString = fromData.toEditorString();

        expect(editString).toBe(editorInputString||dataInputString);
    })

    it('should have no value when given empty string', () => {
        let value = dataType.fromData("", <SchemaField>{});
        let result = value.hasValue();
        expect(result).toBe(false);
    })

    it('should have no value when given null', () => {
        let value = dataType.fromData(null, <SchemaField>{});
        let result = value.hasValue();
        expect(result).toBe(false);
    })

    it('should have a value when given a valid string', () => {
        let value = dataType.fromData(dataInputString, <SchemaField>{});
        let result = value.hasValue();
        expect(result).toBe(true);
    })

    if (smaller && bigger)
    {
        describe('equals', () => {
            it('should return true for equal non-empty for value', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let right = dataType.fromData(smaller, <SchemaField>{});
                let result = left.equals(right);
                expect(result).toBe(true);
            })
            it('should return true for equal non-empty string for value', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let result = left.equals(smaller);
                expect(result).toBe(true);
            })
            it('should return false full left and empty right', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let right = dataType.fromData("", <SchemaField>{});
                let result = left.equals(right);
                expect(result).toBe(false);
            })
            it('should return false full left and empty right string', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let result = left.equals("");
                expect(result).toBe(false);
            })
            it('should return false and empty left and full right string', () => {
                let left = dataType.fromData("", <SchemaField>{});
                let result = left.equals(smaller);
                expect(result).toBe(false);
            })
            it('should return true for both empty (right empty string)', () => {
                let left = dataType.fromData('', <SchemaField>{});
                let result = left.equals("");
                expect(result).toBe(true);
            })
            it('should return  true for both empty', () => {
                let left = dataType.fromData('', <SchemaField>{});
                let right = dataType.fromData("", <SchemaField>{});
                let result = left.equals(right);
                expect(result).toBe(true);
            })
            it('should return false for not equal non-empty values', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let right = dataType.fromData(bigger, <SchemaField>{});
                let result = left.equals(right);
                expect(result).toBe(false);
            })
        })
        describe('greaterThan', () => {
            it('should return true when left is greater than right', () => {
                let left = dataType.fromData(bigger, <SchemaField>{});
                let right = dataType.fromData(smaller, <SchemaField>{});
                let result = left.greaterThan(right);
                expect(result).toBe(true);
            })
            it('should return false when left is less than right', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let right = dataType.fromData(bigger, <SchemaField>{});
                let result = left.greaterThan(right);
                expect(result).toBe(false);
            })
            it('should return false when values are equal', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let right = dataType.fromData(smaller, <SchemaField>{});
                let result = left.greaterThan(right);
                expect(result).toBe(false);
            })

            it('should return null when left is empty', () => {
                let left = dataType.fromData("", <SchemaField>{});
                let right = dataType.fromData(smaller, <SchemaField>{});
                let result = left.greaterThan(right);
                expect(result).toBe(null);
            })
        })
        describe('lessThan', () => {
            it('should return true when left is less than right', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let right = dataType.fromData(bigger, <SchemaField>{});
                let result = left.lessThan(right);
                expect(result).toBe(true);
            })
            it('should return false when left is greater than right', () => {
                let left = dataType.fromData(bigger, <SchemaField>{});
                let right = dataType.fromData(smaller, <SchemaField>{});
                let result = left.lessThan(right);
                expect(result).toBe(false);
            })
            it('should return false when values are equal', () => {
                let left = dataType.fromData(smaller, <SchemaField>{});
                let right = dataType.fromData(smaller, <SchemaField>{});
                let result = left.lessThan(right);
                expect(result).toBe(false);
            })

            it('should return null when left is empty', () => {
                let left = dataType.fromData("", <SchemaField>{});
                let right = dataType.fromData(smaller, <SchemaField>{});
                let result = left.greaterThan(right);
                expect(result).toBe(null);
            })
        })
    }
};