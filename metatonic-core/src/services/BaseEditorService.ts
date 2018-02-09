import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters} from "../domain/Schema/Records";
import {SchemaEntryType} from "../domain/Schema/SchemaEnums";
import {ItemCollectionSize} from "../domain/Schema/ItemSelectionType";
import {FormSchema} from "../domain/Schema/RootSchemas";

type LabeledEditor<TEditor, TLabeler, TRepeater> = { editor: TEditor, labeler: TLabeler, repeater?: TRepeater };
type TypeRegistration<TEditor, TLabeler, TRepeater> = {
    availableComponents: LabeledEditor<TEditor, TLabeler, TRepeater>[];
    uiHintMap: { [uiHint: string]: LabeledEditor<TEditor, TLabeler, TRepeater> };
    defaultComponent?: LabeledEditor<TEditor, TLabeler, TRepeater>;
}
type TypeEditorRegistry<TEditor, TLabeler, TRepeater> = {
    [type:string]: TypeRegistration<TEditor, TLabeler, TRepeater>
}

export class EditorRegistrationContext<
    TEditor extends (...args) => any,
    TLabeler extends (...args) => any,
    TRepeater extends (...args) => any> {
    editorRegistrations: TypeEditorRegistry<TEditor, TLabeler, TRepeater>;
    private _repeater: TRepeater;

    constructor(protected schema: FormSchema, protected select: boolean) {
    }

    registerComponent<TData, TType, TParams, TState>(
        type: string,
        editor: TEditor,
        labeler: TLabeler,
        options?: {
            uiHint?: string | string[],
            isDefault?: boolean,
            repeater?: TRepeater
        }
    ) {
        options = options || {}
        let uiHint = options.uiHint;
        this.createNewTypeEntryIfNeeded(type);
        let labeledEditor = { editor, labeler, repeater: options.repeater };
        let typeEntry = this.editorRegistrations[type];
        typeEntry.availableComponents.push(labeledEditor);

        if (uiHint) {
            if (Array.isArray(uiHint))
                uiHint.forEach(hint => typeEntry[hint] = labeledEditor);
            else
                typeEntry[uiHint] = labeledEditor;
        }

        if (options.isDefault) {
            typeEntry.defaultComponent = labeledEditor;
        }
    }

    defaultRepeater(repeater: TRepeater) {
        this._repeater = repeater;

    }

    getEditorParts(type: string, uiHint?: string) {
        let editorParts = this.getEditorRegistration(type, uiHint);
        if (!editorParts) return null;
        return editorParts.repeater ? editorParts : Object.assign({ repeater: this._repeater }, editorParts);
    }

    private getAvailableEditors(type: string) {
        let types = [type, ...this.getParentTypes(type)];
        return types.reduce((editor, type) => editor || this.editorRegistrations[type], null)
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

    createNewTypeEntryIfNeeded(type: string) {
        if (!this.editorRegistrations[type]) {
            this.editorRegistrations[type] = this.emptyTypeEntry()
        }
    }

    getUiHintForCollectionSize(type: RecordSchemaType) {
        switch (type.parameters.size) {
            case ItemCollectionSize.Large: return "search";
            case ItemCollectionSize.Medium: return "dropdown";
            case ItemCollectionSize.Small: return "radio";
        }
    }

    emptyTypeEntry() {
        return {
            availableComponents: [],
            defaultComponent: undefined,
            uiHintMap: {}
        } as TypeRegistration<TEditor, TLabeler, TRepeater>;
    }
}

export var editorConfig: {
    mainEditorRegistrationContext?: EditorRegistrationContext<any, any, any>
    mainMultiEditorRegistrationContext?: EditorRegistrationContext<any, any, any>
    mainSelectRegistrationContext?: EditorRegistrationContext<any, any, any>
}
