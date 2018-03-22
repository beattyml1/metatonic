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
import {Quantity} from "../../metatonic-core/src/Data/Quantity";
import {Decimal} from "../../metatonic-core/src/Data/Decimal";
import {Integer} from "../../metatonic-core/src/Data/Integer";
import {Date} from "../../metatonic-core/src/Data/Date";
import {findField} from "../../metatonic-core/src/services/FieldNavigationHelpers";
import {copyAndSet} from "../../metatonic-core/src/extensions/functional";

describe('RecordEditor', () => {
    function createTopField(type: Core.SchemaType) {
        return {
            label: "",
            uiUniqueId: "",
            type: type,
            typeName: type.name
        } as SchemaField;
    }
    it('renders correctly with default/blank data', () => {
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
                resources={{editors, store}}></RecordEditor>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly with fully filled data', () => {
        const schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), '');
        const type = schema.type;
        const field = createTopField(type);
        let formData = getDefaultDataForField(field);

        let store = startNewFormStateManager();
        store.fullReload(formData, schema);
        let ownerField = findField(schema.type, 'owners');
        let owner = getDefaultDataForField(ownerField, true);
        store.itemAdded('owners', owner)
        store.propertiesChanged([
            {property: 'address.address1', value: '123 My Place'},
            {property: 'address.city', value: 'Pittsburgh'},
            {property: 'address.state', value: 'PA'},
            {property: 'address.zip', value: '15224'},
            {property: 'owners.0.fullName', value: 'Jane Doe'},
            {property: 'askingPrice', value: {value: Decimal.fromData('123000'), unit: 'dollars'} as Quantity},
            {property: 'numberOfBedRooms', value: Integer.fromData('2')},
            {property: 'datePutOnSale', value: Date.fromData('2018-03-30')}
        ]);
        let data = store.store.getState().formData;
        let editors = new ReactEditorResolver(schema);
        const tree = renderer
            .create(<RecordEditor
                value={data}
                field={field}
                context={Core.createContext(field)}
                fieldState={store.store.getState().formState}
                resources={{editors, store}}></RecordEditor>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})