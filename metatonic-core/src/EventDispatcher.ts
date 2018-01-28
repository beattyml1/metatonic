import {FormEvent} from "domain/StateManagementTypes";
import {render} from "./View";

export enum EventType {
    propertyChanged,
    propertiesChanged,
    trySubmit,
    itemAdded,
    itemRemoved,
    formServerDataUpdate,
    fullReload
}

export function dispatch(event: FormEvent)  {
    stateManagementConfig.mainFormStateManger.dispatch(event);
}

export function respond(state: FormState) {
    render(state);
}

export var stateManagementConfig: {
    mainFormStateManger?: { dispatch: (x) => void }
} = {}