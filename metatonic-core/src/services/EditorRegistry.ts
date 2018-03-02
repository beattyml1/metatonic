type LabeledEditor<TEditor, TLabeler, TRepeater> = { editor: TEditor, labeler: TLabeler, repeater?: TRepeater };
export type TypeRegistration<TEditor, TLabeler, TRepeater> = {
    availableComponents: LabeledEditor<TEditor, TLabeler, TRepeater>[];
    uiHintMap: { [uiHint: string]: LabeledEditor<TEditor, TLabeler, TRepeater> };
    defaultComponent?: LabeledEditor<TEditor, TLabeler, TRepeater>;
}
export type TypeEditorRegistry<TEditor, TLabeler, TRepeater> = {
    [type: string]: TypeRegistration<TEditor, TLabeler, TRepeater>
}

export class EditorRegistry<TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> {
    editorRegistrations: TypeEditorRegistry<TEditor, TLabeler, TRepeater> = {};
    repeater: TRepeater;

    constructor() {
    }

    registerComponent<TData, TType, TParams, TState>(type: string|(new () => any),
                                                     editor: TEditor,
                                                     labeler: TLabeler,
                                                     options?: {
                                                         uiHint?: string | string[],
                                                         isDefault?: boolean,
                                                         repeater?: TRepeater
                                                     }) {
        type = typeof type === "string" ? type : type.name;
        options = options || {}
        let uiHint = options.uiHint;
        this.createNewTypeEntryIfNeeded(type);
        let labeledEditor = {editor, labeler, repeater: options.repeater};
        let typeEntry = this.editorRegistrations[type];
        typeEntry.availableComponents.push(labeledEditor);

        if (uiHint) {
            if (Array.isArray(uiHint))
                uiHint.forEach(hint => typeEntry.uiHintMap[hint] = labeledEditor);
            else
                typeEntry.uiHintMap[uiHint] = labeledEditor;
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

export const editorRegistry = new EditorRegistry<any, any, any>();
export const multiEditRegistry = new EditorRegistry<any, any, any>();
export const selectRegistry = new EditorRegistry<any, any, any>();