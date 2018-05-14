import {EditorRegistry, TypeRegistration} from "./EditorRegistry";
import {Schema} from "../domain/Schema/RootSchemas";
import {RecordSchemaType} from "../domain/Schema/Records";
import {ItemCollectionSize} from "../domain/Schema/ItemSelectionType";

export class EditorResolutionGroup<TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> {

    constructor(protected editors: EditorRegistry<TEditor, TLabeler, TRepeater>,
                protected schema: Schema,
                protected select: boolean) {
    }

    getEditorParts(type: string, uiHint?: string) {
        let editorParts = this.getLabeledEditorEntry(type, uiHint);
        if (!editorParts) return null;
        return editorParts.repeater ? editorParts : Object.assign({repeater: this.editors.repeater}, editorParts);
    }

    private getEditorForBestAvailableType(type: string): TypeRegistration<TEditor, TLabeler, TRepeater> | null {
        let types = [type, ...this.getParentTypes(type)];
        return types.reduce((editor, type) => editor || this.editors.editorRegistrations[type], null)
    }

    private getParentTypes(type: string) {
        return this.schema.types[type].parentTypeNames
    }

    private getLabeledEditorEntry(type: string, uiHint?: string) {
        let typeRegistration = this.getEditorForBestAvailableType(type);
        if (!typeRegistration) return null;

        if (!uiHint && this.select) uiHint = this.getUiHintForCollectionSize(this.schema.types[type] as RecordSchemaType);

        return this.getEditorFromTypeEntry(typeRegistration, uiHint);
    }

    private getEditorFromTypeEntry(typeRegistration: TypeRegistration<TEditor, TLabeler, TRepeater>, uiHint?: string) {
        if (uiHint && typeRegistration.uiHintMap[uiHint]) {
            return typeRegistration.uiHintMap[uiHint];
        } else if (typeRegistration.defaultComponent) {
            return typeRegistration.defaultComponent;
        } else {
            return typeRegistration.availableComponents[0];
        }
    }

    getUiHintForCollectionSize(type: RecordSchemaType) {
        switch (type.parameters.size) {
            case ItemCollectionSize.Large:
                return "search";
            case ItemCollectionSize.Medium:
                return "dropdown";
            case ItemCollectionSize.Small:
                return "radio";
        }
    }
}