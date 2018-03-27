import {createStore, Store} from 'redux';
import {
    FormState,  StateEvents, FormSchema, FormEvent
} from "../domain"
import {Nullable} from "../CoreTypes"
import {
    FormStateChanges,
} from "./FormStateChanges";
import {FormBaseProperties, FormProperties} from "../domain/EditorModels/FormProperties";
import {MetatonicFormEventDispatcher} from "../domain/contracts/MetatonicFormEventDispatcher";
import {PersistantDataStore} from "./PersistantDataStore";

export enum EventType {
    propertyChanged = 'PROPERTY_CHANGED',
    propertiesChanged = 'PROPERTIES_CHANGED',
    trySubmit = 'TRY_SUBMIT',
    itemAdded = 'ITEM_ADDED',
    itemRemoved = 'ITEM_REMOVED',
    formServerDataUpdate = 'FORM_SERVER_DATA_UPDATE',
    fullReload = 'FULL_RELOAD'
}

export function startNewFormStateManager(dataStore: PersistantDataStore) {
    let store = createStore<FormState>((state: FormState, action: {type, data}) => {
        switch (action.type) {
            case StateEvents.itemAdded: return FormStateChanges.itemAdded(state, action.data.propertySelector, action.data.item, action.data.index);
            case StateEvents.itemRemoved: return FormStateChanges.itemRemoved(state, action.data.propertySelector, action.data.index);
            case StateEvents.formServerUpdate: return FormStateChanges.formServerUpdate(state, action.data.formData);
            case StateEvents.propertiesChanged: return FormStateChanges.propertiesChanged(state, action.data.properties);
            case StateEvents.propertyChanged: return FormStateChanges.propertyChanged(state, action.data.propertySelector, action.data.value);
            case StateEvents.fullReload: return FormStateChanges.fullReload(state||{}, action.data.formData, action.data.schema);
            default: return state||{};
        }
    });
    return new ReduxStateManager(store, dataStore);
}

export class ReduxStateManager implements MetatonicFormEventDispatcher{
    constructor(public store: Store<FormState>, public dataStore: PersistantDataStore) {

    }

    propertyChanged(propertySelector: string, value){
        this.store.dispatch({type: StateEvents.propertyChanged, data: { propertySelector, value }} as any)
    }

    itemAdded(propertySelector: string, item, index?: Nullable<number>) {
        this.store.dispatch({type: StateEvents.itemAdded, data: { propertySelector, index, item }} as any)
    }

    itemRemoved(propertySelector: string, index: number) {
        this.store.dispatch({type: StateEvents.itemRemoved, data: { propertySelector, index }} as any)
    }

    propertiesChanged(properties: { property: string, value: any }[]) {
        this.store.dispatch({type: StateEvents.propertiesChanged, data: { properties }} as any)
    }

    formServerUpdate(formData: any) {
        this.store.dispatch({type: StateEvents.formServerUpdate, data: { formData }} as any)
    }

    fullReload(formData: any, schema: FormSchema) {
        this.store.dispatch({type: StateEvents.fullReload, data: { formData, schema }} as any)
    }
    trySubmit() {

    }

    async loadFormFromServer(formProps: FormBaseProperties) {
        let resource = this.dataStore.records(formProps.recordName);
        let formData = await resource.getOne(formProps.recordId||"new");
        let schema = await resource.schema();
        return this.fullReload(formData, schema);
    }
}
