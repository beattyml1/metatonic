
import {ValueDataType, ValueDataTypeConstructor} from "../src/Data/BaseDataTypes";
import {SchemaField} from "../src/domain/Schema/Records";

declare var require;
declare var it;
declare var expect;


export function valueTypeTests(dataType: ValueDataTypeConstructor & (new (...args) => ValueDataType), dataInputString: string) {
    it('should convert from data string and back', () => {
        let val = dataType.fromData(dataInputString, <SchemaField>{}) as ValueDataType;

        expect(val.toDataString()).toBe(dataInputString);
    })
    it('should convert from editor string and back', () => {
        let val = dataType.fromEditor(dataInputString, <SchemaField>{}) as ValueDataType;

        expect(val.toEditorString()).toBe(dataInputString);
    })
};