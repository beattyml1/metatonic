import {createStore, Store} from 'redux';
import {
    FormState,  StateEvents, FormSchema, FormEvent
} from "../domain"
import {Nullable} from "../CoreTypes"
import {
    FormStateChanges,
} from "./FormStateChanges";

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
    let store = createStore<FormState>((state: FormState, action) => {
        let formStateChanges = new FormStateChanges();
        switch (action.event) {
            case StateEvents.formServerUpdate: return formStateChanges.formServerUpdate(state, action.data.formData);
            case StateEvents.propertiesChanged: return formStateChanges.propertiesChanged(state, action.data.properties);
            case StateEvents.propertyChanged: return formStateChanges.propertyChanged(state, action.data.propertySelector, action.data.value);
            case StateEvents.fullReload: return formStateChanges.fullReload(state, action.data.formData, action.data.schema);
            default: return state;
        }
    });
    return new ReduxStateManager(store);
}

export class ReduxStateManager {
    constructor(public store: Store<FormState>) {

    }

    propertyChanged(propertySelector: string, value){
        this.store.dispatch({event: StateEvents.propertyChanged, data: { propertySelector, value }} as any)
    }

    itemAdded(propertySelector: string, item, index?: Nullable<number>) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { propertySelector, index, item }} as any)
    }

    itemRemoved(propertySelector: string, index: number) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { propertySelector, index }} as any)
    }

    propertiesChanged(properties: { property: string, value: any }[]) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { properties }} as any)
    }

    formServerUpdate(formData: any) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { formData }} as any)
    }

    fullReload(formData: any, schema: FormSchema) {
        this.store.dispatch({event: StateEvents.propertyChanged, data: { formData, schema }} as any)
    }
    trySubmit() {

    }
}
