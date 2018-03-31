import {FormEvent, FormSchema, FormState, StateEvents} from "metatonic-core"
import {FormStateChanges} from "metatonic-core";

export function formReduce (state: FormState, action: {type, payload}) {
    switch (action.type) {
        case StateEvents.itemAdded: return FormStateChanges.itemAdded(state, action.payload.propertySelector, action.payload.item, action.payload.index);
        case StateEvents.itemRemoved: return FormStateChanges.itemRemoved(state, action.payload.propertySelector, action.payload.index);
        case StateEvents.formServerDataUpdate: return FormStateChanges.formServerUpdate(state, action.payload.formData);
        case StateEvents.propertiesChanged: return FormStateChanges.propertiesChanged(state, action.payload.properties);
        case StateEvents.propertyChanged: return FormStateChanges.propertyChanged(state, action.payload.propertySelector, action.payload.value);
        case StateEvents.fullReload: return FormStateChanges.fullReload(state||{}, action.payload.formData, action.payload.schema);
        default: return state||{};
    }
}