import {FormEvent, FormState} from "./domain/StateManagementTypes";

export enum EventType {
    propertyChanged,
    propertiesChanged,
    trySubmit,
    itemAdded,
    itemRemoved,
    formServerDataUpdate,
    fullReload
}