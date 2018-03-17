import {RecordEditor} from "../src/Editors/RecordEditor";
import renderer = require('react-test-renderer');
import * as React from "react";
import * as Core from 'metatonic-core'
import {SchemaField} from "metatonic-core";
import {SchemaType} from "metatonic-core";
import {recordSchema,getFormSchemaFromJsonObject} from "../../metatonic-core/test/TestUtils";
import {exampleSchema} from "../../metatonic-core/test/TestSchema";
import {getDefaultDataForField} from "metatonic-core";
import {startNewFormStateManager} from "metatonic-core";
import {FormSchema} from "metatonic-core";
import {ReactEditorResolver} from "../src/Services/ReactEditorService";
import {editorRegistry} from "../../metatonic-core/src/services/EditorRegistry";
import '../src';
import {addUniqueIdsToChildren} from "../../metatonic-core/src/services/IdGeneratorService";

describe('RecordEditor', () => {
    function createTopField(type: Core.SchemaType) {
        return {
            label: "",
            uiUniqueId: "",
            type: type,
            typeName: type.name
        } as SchemaField;
    }
    it('renders correctly with a text field and numeric field', () => {
        const schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), '');
        const type = schema.type;
        const field = createTopField(type);
        let formData = getDefaultDataForField(field);

        let store = startNewFormStateManager();
        store.fullReload(formData, schema);
        let editors = new ReactEditorResolver(schema);
        const tree = renderer
            .create(<RecordEditor
                value={store.store.getState().formData}
                field={field}
                context={Core.createContext(field)}
                fieldState={store.store.getState().formState}
                globals={{editors, store}}></RecordEditor>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})