
import {ValueDataType, ValueDataTypeConstructor} from "../src/Data/BaseDataTypes";
import {SchemaField} from "../src/domain/Schema/Records";

declare var require;
declare var it;
declare var expect;


export function valueTypeTests(dataType: ValueDataTypeConstructor & (new (...args) => ValueDataType), dataInputString: string, editorInputString?:string) {
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
};