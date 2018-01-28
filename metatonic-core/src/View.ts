import {FormState} from "domain/StateManagementTypes";

export function render(state: FormState) {
    mainViewConfig.mainFormRenderer.render(state);
}

export var mainViewConfig: {
    mainFormRenderer: {render(state:FormState)}
} = {
    mainFormRenderer: {}
}