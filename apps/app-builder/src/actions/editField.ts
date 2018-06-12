import {BaseFieldContextComponent} from 'metatonic-react'
import {AppBuilderActions} from "../types/Types";
import {BaseEditorModel} from 'metatonic-core'

export function editFieldForComponent(component: BaseFieldContextComponent<BaseEditorModel<any>, any>) {
    return editField(component.props.context.fieldLocator);
}

export function editField(fieldLocator: string) {
    return {
        type: AppBuilderActions.EditField,
        payload: { fieldLocator }
    }
}