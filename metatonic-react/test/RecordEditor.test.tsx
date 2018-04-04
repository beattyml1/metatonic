import {RecordEditor} from "../src/Editors/RecordEditor";
import renderer = require('react-test-renderer');
import * as React from "react";
import * as Core from 'metatonic-core'
import {SchemaField} from "metatonic-core";
import {SchemaType} from "metatonic-core";
import {getFormSchemaFromJsonObject,defaultComponentRegistry} from "metatonic-core";
import {exampleSchema} from "../../metatonic-core/test/TestSchema";
import {recordSchema} from "../../metatonic-core/test/TestUtils";
import {getDefaultDataForField} from "metatonic-core";
import {ReactEditorResolver} from "../src/Services/ReactEditorService";
import {} from "metatonic-core";
import '../src/edtitors';
import {addUniqueIdsToChildren} from "metatonic-core";
import {Quantity} from "metatonic-core";
import {Decimal} from "metatonic-core";
import {Integer} from "metatonic-core";
import {Date} from "metatonic-core";
import {findField} from "metatonic-core";
import {createStore} from "redux";
import {AppDispatcher} from "metatonic-core";
import {ObjectDataStorage} from "metatonic-core";
import {getDefaultFormState} from "../../metatonic-core/src/services/DefaultFormState";
import {getEditorResolverContext} from "../../metatonic-core/src/services/EditorResolver";
import {FormUserEvents} from "../../metatonic-core/src/state/FormUserEvents";
import {RecordSchemaType} from "../../metatonic-core/src/domain/Schema/Records";

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
        const editors = getEditorResolverContext(defaultComponentRegistry, schema) as ReactEditorResolver;

        let data = {
            ...getDefaultDataForField(field)
        };
        const tree = renderer
            .create(<RecordEditor
                value={data}
                field={field}
                context={Core.createContext(field)}
                fieldState={getDefaultFormState(field.type)}
                resources={{
                    editors, formDispatcher: new FormUserEvents({dispatch: () => {}})
                }}></RecordEditor>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with fully filled data', () => {
        const schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), '');
        const type = schema.type;
        const field = createTopField(type);
        const editors = getEditorResolverContext(defaultComponentRegistry, schema) as ReactEditorResolver;

        let ownerField = findField(schema.type, 'owners');
        let data = {
            ...getDefaultDataForField(field),
            askingPrice: {value: Decimal.fromData('123000'), unit: 'dollars'} as Quantity,
            numberOfBedRooms: Integer.fromData('2'),
            datePutOnSale:Date.fromData('2018-03-30'),
            owners: [
                { ...getDefaultDataForField(ownerField, true),
                    fullName: 'Jane Doe'
                }
            ],
            address: {
                ...getDefaultDataForField(findField(schema.type, 'address'), true),
                address1: '123 My Place',
                city: 'Pittsburgh',
                state: 'PA',
                zip: '15224'
            }
        };
        const tree = renderer
            .create(<RecordEditor
                value={data}
                field={field}
                context={Core.createContext(field)}
                fieldState={getDefaultFormState(field.type)}
                resources={{
                    editors, formDispatcher: new FormUserEvents({dispatch: () => {}})
                }}></RecordEditor>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})