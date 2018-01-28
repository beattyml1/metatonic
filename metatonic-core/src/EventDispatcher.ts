import {FormEvent} from "domain/StateManagementTypes";

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

}

export var stateManagementConfig: {
    mainFormStateManger?: any
} = {}