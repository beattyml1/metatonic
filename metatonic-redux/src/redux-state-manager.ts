import { createStore } from 'redux';
import {
    FormState, FormStateChanges, FormEvent, StateEvents
} from "metatonic-core/src/index";
import {respond, stateManagementConfig} from "../../metatonic-core/src/EventDispatcher";

export function startNewFormStateManager() {
    return createStore((state: FormState, action: FormEvent) => {
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

export var mainFormStateManager = startNewFormStateManager();

stateManagementConfig.mainFormStateManger = mainFormStateManager;

mainFormStateManager.subscribe(respond)
