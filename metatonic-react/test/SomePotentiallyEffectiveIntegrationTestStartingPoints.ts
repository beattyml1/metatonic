// import {RecordEditor} from "../src/Editors/RecordEditor";
// import renderer = require('react-test-renderer');
// import * as React from "react";
// import * as Core from 'metatonic-core'
// import {SchemaField} from "metatonic-core";
// import {SchemaType} from "metatonic-core";
// import {getFormSchemaFromJsonObject,defaultComponentRegistry} from "metatonic-core";
// import {exampleSchema} from "../../metatonic-core/test/TestSchema";
// import {recordSchema} from "../../metatonic-core/test/TestUtils";
// import {getDefaultDataForField} from "metatonic-core";
// import {ReactEditorResolver} from "../src/Services/ReactEditorService";
// import {} from "metatonic-core";
// import '../src';
// import {addUniqueIdsToChildren} from "metatonic-core";
// import {Quantity} from "metatonic-core";
// import {Decimal} from "metatonic-core";
// import {Integer} from "metatonic-core";
// import {Date} from "metatonic-core";
// import {findField} from "metatonic-core";
// import {createStore} from "redux";
// import {AppDispatcher} from "metatonic-core";
// import {ObjectDataStorage} from "metatonic-core";
//
// describe('RecordEditor', () => {
//     function createTopField(type: Core.SchemaType) {
//         return {
//             label: "",
//             uiUniqueId: "",
//             type: type,
//             typeName: type.name
//         } as SchemaField;
//     }
//     it('renders correctly with default/blank data', () => {
//         const schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), '');
//         const type = schema.type;
//         const field = createTopField(type);
//         let formData = getDefaultDataForField(field);
//         let storage = new ObjectDataStorage({
//             records: {
//                 $schema: exampleSchema
//             }
//         });
//
//         let editors = new ReactEditorResolver(schema);
//         let metatonicApp = createMetatonicApp(createStore(x=>x), { } as AppDispatcher, editors, storage);
//         let resources = metatonicApp.createFormResources();
//         resources.formDispatcher.fullReload(formData, schema);
//
//         const tree = renderer
//             .create(<RecordEditor
//                 value={resources.formStore.getState().formData}
//         field={field}
//         context={Core.createContext(field)}
//         fieldState={resources.formStore.getState().formState}
//         resources={metatonicApp.createFormResources()}></RecordEditor>)
//             .toJSON();
//         expect(tree).toMatchSnapshot();
//     });
//     it('renders correctly with fully filled data', () => {
//         const schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), '');
//         const type = schema.type;
//         const field = createTopField(type);
//         let formData = getDefaultDataForField(field);
//         let editors = new ReactEditorResolver(schema);
//         let storage = new ObjectDataStorage({
//             records: {
//                 $schema: exampleSchema
//             }
//         });
//
//         let metatonicApp = createMetatonicApp(createStore(x=>x), { } as AppDispatcher, editors, storage);
//         let resources = metatonicApp.createFormResources();
//         resources.formDispatcher.fullReload(formData, schema);
//
//         let ownerField = findField(schema.type, 'owners');
//         let owner = getDefaultDataForField(ownerField, true);
//         resources.formDispatcher.itemAdded('owners', owner)
//         resources.formDispatcher.propertiesChanged([
//             {property: 'address.address1', value: '123 My Place'},
//             {property: 'address.city', value: 'Pittsburgh'},
//             {property: 'address.state', value: 'PA'},
//             {property: 'address.zip', value: '15224'},
//             {property: 'owners.0.fullName', value: 'Jane Doe'},
//             {property: 'askingPrice', value: {value: Decimal.fromData('123000'), unit: 'dollars'} as Quantity},
//             {property: 'numberOfBedRooms', value: Integer.fromData('2')},
//             {property: 'datePutOnSale', value: Date.fromData('2018-03-30')}
//         ]);
//         let data = resources.formStore.getState().formData;
//         const tree = renderer
//             .create(<RecordEditor
//                 value={data}
//         field={field}
//         context={Core.createContext(field)}
//         fieldState={resources.formStore.getState().formState}
//         resources={resources}></RecordEditor>)
//             .toJSON();
//         expect(tree).toMatchSnapshot();
//     });
// })