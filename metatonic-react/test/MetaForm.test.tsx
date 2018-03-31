import {RecordEditor} from "../src/Editors/RecordEditor";
import renderer = require('react-test-renderer');
import * as React from "react";
import * as Core from 'metatonic-core'
import {SchemaField} from "metatonic-core";
import {SchemaType} from "metatonic-core";
import {recordSchema,getFormSchemaFromJsonObject} from "metatonic-core";
import {exampleSchema} from "metatonic-core";
import {getDefaultDataForField} from "metatonic-core";
import {startNewFormStateManager} from "metatonic-core";
import {FormSchema, ObjectDataStorage} from "metatonic-core";
import {ReactEditorResolver} from "../src/Services/ReactEditorService";
import {editorRegistry} from "metatonic-core";
import '../src';
import {addUniqueIdsToChildren} from "metatonic-core";
import {Quantity} from "metatonic-core";
import {Decimal} from "metatonic-core";
import {Integer} from "metatonic-core";
import {Date} from "metatonic-core";
import {findField} from "metatonic-core";
import {copyAndSet} from "metatonic-core";
import {MetaForm} from '../src/MetaForm'
import {createMetatonicApp} from "metatonic-core";
import {createStore} from "redux";
import {AppDispatcher} from "metatonic-core";

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
        let storage = new ObjectDataStorage({
            records: {
                $schema: exampleSchema
            }
        });

        let metatonicApp = createMetatonicApp(createStore(x=>x), { } as AppDispatcher, new ReactEditorResolver(schema), storage);
        let formProps = metatonicApp.createFormParameters({
            recordName: 'Home',
            recordId: null,
            title: 'Enter Record'
        });

        formProps.resources.formDispatcher.fullReload(formData, schema);

        let component = renderer.create(
                <MetaForm {...formProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('renders correctly for existing data', () => {

    });
})