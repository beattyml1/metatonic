import {createStore, Store} from 'redux';
import {
    FormState, FormStateChanges, StateEvents, Nullable, FormSchema
} from "metatonic-core/src/index";
import {respond, stateManagementConfig} from "metatonic-core/src/index";

export enum EventType {
    propertyChanged,
    propertiesChanged,
    trySubmit,
    itemAdded,
    itemRemoved,
    formServerDataUpdate,
    fullReload
}

export function startNewFormStateManager() {
    let store = createStore((state: FormState, action: FormEvent<any>) => {
        let formStateChanges = new FormStateChanges();
        switch (action.event) {
            case StateEvents.formServerUpdate: return formStateChanges.formServerUpdate(state, action.data.formData);
            case StateEvents.propertiesChanged: return formStateChanges.propertiesChanged(state, action.data.properties);
            case StateEvents.propertyChanged: return formStateChanges.propertyChanged(state, action.data.propertySelector, action.data.value);
            case StateEvents.fullReload: return formStateChanges.fullReload(state, action.data.formData, action.data.schema);
        }
    });
    return new ReduxStateManager(store);
}

export class ReduxStateManager {
    constructor(public store: Store<FormState>) {

    }

    propertyChanged(propertySelector: string, value){
        this.store.dispatch({event: StateEvents.propertyChanged, data: { propertySelector, value }})
    }

    itemAdded(propertySelector: string, item, index: Nullable<number>) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { propertySelector, index, item }})
    }

    itemRemoved(propertySelector: string, index: number) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { propertySelector, index }})
    }

    propertiesChanged(properties: { property: string, value: any }[]) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { properties }})
    }ß

    formServerUpdate(formData: any) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { formData }})
    }

    fullReload(formData: any, schema: FormSchema) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { formData, schema }})
    }
    trySubmit() {

    }
}
