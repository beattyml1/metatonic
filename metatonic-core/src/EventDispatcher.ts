export enum EventType {
    propertyChanged,
    propertiesChanged,
    trySubmit,
    itemAdded,
    itemRemoved,
    formServerDataUpdate,
    fullReload
}

export function dispatch(type: EventType.propertyChanged, fieldLocator: string, parameters: {});
export function dispatch(type: EventType.propertiesChanged, fieldLocator: string, parameters: {});
export function dispatch(type: EventType.trySubmit, fieldLocator: string, parameters: {});
export function dispatch(type: EventType.itemAdded, fieldLocator: string, parameters: {});
export function dispatch(type: EventType.itemRemoved, fieldLocator: string, parameters: {});
export function dispatch(type: EventType.formServerDataUpdate, fieldLocator: string, parameters: {});
export function dispatch(type: EventType.fullReload, fieldLocator: string, parameters: {});
export function dispatch(type: EventType, fieldLocator: string, parameters) {

}