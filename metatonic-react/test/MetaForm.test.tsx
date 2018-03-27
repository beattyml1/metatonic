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
import {Quantity} from "../../metatonic-core/src/data/Quantity";
import {Decimal} from "../../metatonic-core/src/data/Decimal";
import {Integer} from "../../metatonic-core/src/data/Integer";
import {Date} from "../../metatonic-core/src/data/Date";
import {findField} from "../../metatonic-core/src/services/FieldNavigationHelpers";
import {copyAndSet} from "../../metatonic-core/src/extensions/functional";
import {MetaForm} from '../src/MetaForm'
import {createMetatonicApp} from "../../metatonic-core/src/MetatonicApp";
import {createStore} from "redux";
import {AppDispatcher} from "../../metatonic-core/src/domain/contracts/AppDispatcher";

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
        const schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), '');
        const type = schema.type;
        const field = createTopField(type);
        let formData = getDefaultDataForField(field);

        let metatonicApp = createMetatonicApp(createStore(x=>x), { } as AppDispatcher, new ReactEditorResolver(schema), new ObjectDataStorage({}));
        let formProps = metatonicApp.createFormParameters({
            recordName: 'Home',
            recordId: null,
            title: 'Enter Record'
        });

        formProps.resources.formDispatcher.loadFormFromServer(formProps);

        let component = renderer.create(
                <MetaForm {...formProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('renders correctly for existing data', () => {

    });
})