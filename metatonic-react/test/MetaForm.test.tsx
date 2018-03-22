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
import {FormSchema, ObjectDataStorage} from "metatonic-core";
import {ReactEditorResolver} from "../src/Services/ReactEditorService";
import {editorRegistry} from "../../metatonic-core/src/services/EditorRegistry";
import '../src';
import {addUniqueIdsToChildren} from "../../metatonic-core/src/services/IdGeneratorService";
import {Quantity} from "../../metatonic-core/src/Data/Quantity";
import {Decimal} from "../../metatonic-core/src/Data/Decimal";
import {Integer} from "../../metatonic-core/src/Data/Integer";
import {Date} from "../../metatonic-core/src/Data/Date";
import {findField} from "../../metatonic-core/src/services/FieldNavigationHelpers";
import {copyAndSet} from "../../metatonic-core/src/extensions/functional";
import {MetaForm} from '../src/MetaForm'

describe('RecordEditor', () => {
    function createTopField(type: Core.SchemaType) {
        return {
            label: "",
            uiUniqueId: "",
            type: type,
            typeName: type.name
        } as SchemaField;
    }
    it('renders correctly for new data', () => {
        expect.assertions(2);
        const schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), '');
        const type = schema.type;
        const field = createTopField(type);
        let formData = getDefaultDataForField(field);

        let store = startNewFormStateManager();
        store.fullReload(formData, schema);
        let editors = new ReactEditorResolver(schema);

        let component;
        let promise = new Promise<any>((resolve, reject) => {
            component = renderer
                .create(
                    <MetaForm recordName='Home' recordId={null} title='Enter Record' dataStore={new ObjectDataStorage({})} afterLoad={resolve} />)
                ;
            expect(component.toJSON()).toMatchSnapshot();
        });
        return promise.then(() =>
            expect(component.toJSON()).toMatchSnapshot());
    });
    it('renders correctly for existing data', () => {

    });
})