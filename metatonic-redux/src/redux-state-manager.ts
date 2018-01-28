import { createStore } from 'redux';
import {
    FormState, FormStateChanges, FormEvent, StateEvents
} from "metatonic-core/src/index";

export function startStateManager() {
    createStore((state: FormState, action: FormEvent) => {
        let formStateChanges = new FormStateChanges();
        switch (action.event) {
            case StateEvents.formServerUpdate: return formStateChanges.formServerUpdate(state, action.data);
            case StateEvents.propertiesChanged: return formStateChanges.propertiesChanged(state, action.data);
            case StateEvents.propertyChanged: return formStateChanges.propertyChanged(state, action.data);
            case StateEvents.fullReload: return formStateChanges.fullReload(state, action.data);
            case StateEvents.trySubmit: return formStateChanges.trySubmit(state, action.data);
        }
    });
}
