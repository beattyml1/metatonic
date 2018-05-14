import {FormEvents} from "metatonic-core";

export function initializeStateEmpty(formId) {
    return {type: FormEvents.initializeStateEmpty, payload: {}, meta: {formId} }
}

export function loadStarted(formId) {
    return {type: FormEvents.loadStarted, payload: {}, meta: {formId} }
}

export function initializeState(formId, state) {
    return {type: FormEvents.initializeState, payload: state, meta: {formId} }
}

export function loadFinished(formId) {
    return {type: FormEvents.loadFinished, payload: {}, meta: {formId} }
}