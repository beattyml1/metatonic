import {createStore, Store} from 'redux';
import {
    FormState,  StateEvents, FormSchema, FormEvent
} from "../domain"
import {Nullable} from "../CoreTypes"
import {
    FormStateChanges,
} from "./FormStateChanges";
import {FormProperties} from "../domain/EditorModels/FormProperties";
import {MetatonicFormEventDispatcher} from "../domain/contracts/MetatonicFormEventDispatcher";

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
    let store = createStore<FormState>((state: FormState, action: {type, data}) => {
        switch (action.type) {
            case StateEvents.itemAdded: return FormStateChanges.itemAdded(state, action.data.propertySelector, action.data.item, action.data.index);
            case StateEvents.itemRemoved: return FormStateChanges.itemRemoved(state, action.data.propertySelector, action.data.index);
            case StateEvents.formServerUpdate: return FormStateChanges.formServerUpdate(state, action.data.formData);
            case StateEvents.propertiesChanged: return FormStateChanges.propertiesChanged(state, action.data.properties);
            case StateEvents.propertyChanged: return FormStateChanges.propertyChanged(state, action.data.propertySelector, action.data.value);
            case StateEvents.fullReload: return FormStateChanges.fullReload(state||{}, action.data.formData, action.data.schema);
            case 'SetSate': return action.data;
            default: return state||{};
        }
    });
    return new ReduxStateManager(store);
}

export class ReduxStateManager implements MetatonicFormEventDispatcher{
    constructor(public store: Store<FormState>) {

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

    handleFormOverwritePromise<T>(state, asyncAction: () => Promise<T>) {
        asyncAction().then(s => this.store.dispatch({type: 'SetState', data: s}))
    }

    loadFormFromServer(formProps: FormProperties) {
        return this.handleFormOverwritePromise({}, () => FormStateChanges.loadFormFromServer({} ,formProps))
    }
}
