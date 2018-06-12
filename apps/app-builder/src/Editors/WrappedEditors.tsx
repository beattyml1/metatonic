import {wrap, bind, wrapAndBind} from './Wrapper'
import {BaseFieldContextComponent} from "metatonic-react";
import InputBoxLabelContainer from "metatonic-react/lib/src/LabeledFieldContainers/InputFieldLabelAndContainer";
import FieldSet from "metatonic-react/lib/src/LabeledFieldContainers/FieldSet";
import {} from "metatonic-react/lib/editors";
import {defaultComponentRegistry} from 'metatonic-core'

import 'metatonic-react/lib/editors'
import {BuilderFieldSetLabelerBound} from "./BuilderFieldSetLabeler";

export const InputLabeler = wrapAndBind(InputBoxLabelContainer);
export const FieldSetLabeler = wrapAndBind(FieldSet);

let wrapComponentRegistration = comp => {
    return {
        ...comp,
        editor: wrapAndBind(comp.editor),
        labeler: comp.labeler === FieldSet ? wrapAndBind(BuilderFieldSetLabelerBound) : wrapAndBind(comp.labeler)
    }
}

let wrapTypeRegistration = reg => reg.defaultComponent ? {
    ...reg,
    defaultComponent: wrapComponentRegistration(reg.defaultComponent),
    availableComponents: reg.availableComponents.map(wrapComponentRegistration)
} : reg;

let wrapRegistry = reg => Object.entries(reg).reduce((res, [key, x]) => ({...res, [key]:wrapTypeRegistration(x)}), {});


defaultComponentRegistry.multiEdits.editorRegistrations = wrapRegistry(defaultComponentRegistry.multiEdits.editorRegistrations)
defaultComponentRegistry.editors.editorRegistrations = wrapRegistry(defaultComponentRegistry.editors.editorRegistrations)
defaultComponentRegistry.selects.editorRegistrations = wrapRegistry(defaultComponentRegistry.selects.editorRegistrations)
console.log(JSON.stringify(defaultComponentRegistry.editors.editorRegistrations));