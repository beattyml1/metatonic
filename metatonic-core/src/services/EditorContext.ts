import {RecordSchemaType, SchemaField} from "../domain/Schema/Records";
import {SchemaEntryType} from "../domain/Schema/SchemaEnums";
import {ItemCollectionSize} from "../domain/Schema/ItemSelectionType";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {EditorRegistry} from "./EditorRegistry";

export class EditorSubContext<
    TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> {

    constructor(protected editors: EditorRegistry<TEditor, TLabeler, TRepeater>,
                protected schema: FormSchema,
                protected select: boolean) {

    }

    getEditorParts(type: string, uiHint?: string) {
        let editorParts = this.getEditorRegistration(type, uiHint);
        if (!editorParts) return null;
        return editorParts.repeater ? editorParts : Object.assign({ repeater: this.editors.repeater }, editorParts);
    }

    private getAvailableEditors(type: string) {
        let types = [type, ...this.getParentTypes(type)];
        return types.reduce((editor, type) => editor || this.editors.editorRegistrations[type], null)
    }

    private getParentTypes(type: string) {
        return this.schema.types[type].parentTypeNames
    }

    private getEditorRegistration(type: string, uiHint?: string) {
        let typeRegistration = this.getAvailableEditors(type);
        if (!uiHint && this.select) uiHint = this.getUiHintForCollectionSize(this.schema.types[type] as RecordSchemaType)
        if (typeRegistration) {
            if (uiHint && typeRegistration[uiHint]) {
                return typeRegistration.uiHintMap[uiHint];
            } else if (typeRegistration.defaultComponent) {
                return typeRegistration.defaultComponent;
            } else {
                return typeRegistration.availableComponents[0];
            }
        } else return null;
    }

    getUiHintForCollectionSize(type: RecordSchemaType) {
        switch (type.parameters.size) {
            case ItemCollectionSize.Large: return "search";
            case ItemCollectionSize.Medium: return "dropdown";
            case ItemCollectionSize.Small: return "radio";
        }
    }
}


export class EditorContext<
    TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> {
    constructor(protected edit: EditorSubContext<TEditor, TLabeler, TRepeater>,
                protected select: EditorSubContext<TEditor, TLabeler, TRepeater>,
                protected multiEdit: EditorSubContext<TEditor, TLabeler, TRepeater>) {
    }

    getEditorComponents(field: SchemaField) {
        if (field.entryType === SchemaEntryType.entry) {
            return this.edit.getEditorParts(field.name, field.uiControlPreference);
        } else if (field.multiple) {
            return this.select.getEditorParts(field.name, field.uiControlPreference)
        } else {
            return this.multiEdit.getEditorParts(field.name, field.uiControlPreference)
        }
    }
}




