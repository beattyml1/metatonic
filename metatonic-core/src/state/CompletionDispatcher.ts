import {FormEvents} from "../domain/StateManagementTypes";

export function submit(submission: Promise<any>) {
    return submission
        .then(data => ({ type: FormEvents.submitSucceeded, payload: data }))
        .catch(message => ({ type: FormEvents.submitFailed, payload: [ message ] }))
        .then(state => ({ type: FormEvents.submitAttemptFinished }))
}