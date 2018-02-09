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

export class EditorRegistrationSubContext<
    TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> {
    editorRegistrations: TypeEditorRegistry<TEditor, TLabeler, TRepeater>;
    repeater: TRepeater;

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
        this.repeater = repeater;
    }

    createNewTypeEntryIfNeeded(type: string) {
        if (!this.editorRegistrations[type]) {
            this.editorRegistrations[type] = this.emptyTypeEntry()
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

export class EditorSubContext<
    TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> {

    constructor(protected editors: EditorRegistrationSubContext<TEditor, TLabeler, TRepeater>,
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
export var editorConfig: {
    mainEditorRegistrationContext?: EditorRegistrationSubContext<any, any, any>
    mainMultiEditorRegistrationContext?: EditorRegistrationSubContext<any, any, any>
    mainSelectRegistrationContext?: EditorRegistrationSubContext<any, any, any>
}
