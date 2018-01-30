import {SchemaField} from "../domain/Schema/Records";
import {SchemaEntryType} from "../domain/Schema/SchemaEnums";

type LabeledEditor<TEditor, TLabeler, TRepeater> = { editor: TEditor, labeler: TLabeler, repeater: TRepeater };
type TypeRegistration<TEditor, TLabeler> = {
    availableComponents: LabeledEditor<TEditor, TLabeler>[];
    uiHintMap: { [uiHint: string]: LabeledEditor<TEditor, TLabeler> };
    defaultComponent?: LabeledEditor<TEditor, TLabeler>;
}
type TypeEditorRegistry<TEditor, TLabeler> = {
    [type:string]: TypeRegistration<TEditor, TLabeler>
}

export class EditorRegistrationContext<
    TEditor extends (...args) => any,
    TLabeler extends (...args) => any,
    TRepeater extends (...args) => any> {
    editorRegistrations: TypeEditorRegistry<TEditor, TLabeler, TRepeater>;
    private _repeater: TRepeater;

    registerComponent<TData, TType, TParams, TState>(
        type: string,
        editor: TEditor,
        labeler: TLabeler,
        uiHint?: string|string[],
        isDefault: boolean = false,
        repeater?: TRepeater
    ) {
        this.createNewTypeEntryIfNeeded(type);
        let labeledEditor = { editor, labeler, repeater };
        let typeEntry = this.editorRegistrations[type];
        typeEntry.availableComponents.push(labeledEditor);

        if (uiHint) {
            if (Array.isArray(uiHint))
                uiHint.forEach(hint => typeEntry[hint] = labeledEditor);
            else
                typeEntry[uiHint] = labeledEditor;
        }

        if (isDefault) {
            typeEntry.defaultComponent = labeledEditor;
        }
    }

    defaultRepeater(repeater: TRepeater) {
        this._repeater = repeater;

    }

    getEditorParts(type: string, uiHint?: string) {
        let editorParts = this.getEditorRegistration(type, uiHint);
        return editorParts.repeater ? editorParts : Object.assign({ repeater: this._repeater }, editorParts);
    }

    private getEditorRegistration(type: string, uiHint?: string) {
        let typeRegistration = this.editorRegistrations[type];
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

    emptyTypeEntry() {
        return {
            availableComponents: [],
            defaultComponent: undefined,
            uiHintMap: {}
        } as TypeRegistration<TEditor, TLabeler>;
    }
}

export var editorConfig: {
    mainEditorRegistrationContext?: EditorRegistrationContext<any, any>
    mainMultiEditorRegistrationContext?: EditorRegistrationContext<any, any>
    mainSelectRegistrationContext?: EditorRegistrationContext<any, any>
}
