import {SchemaField} from "../domain/Schema/Records";
import {SchemaEntryType} from "../domain/Schema/SchemaEnums";
import {Schema} from "../domain/Schema/RootSchemas";
import {ComponentRegistry, LabeledEditor} from "./EditorRegistry";
import {EditorResolutionGroup} from "./EditorResolutionGroup";

export interface EditorResolver<
    TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> {
    getEditorComponents(field: SchemaField): LabeledEditor<TEditor, TLabeler, TRepeater>|null;
}

class EditorResolverImplementation<
    TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any> implements  EditorResolver<TEditor, TLabeler, TRepeater> {
    constructor(protected edit: EditorResolutionGroup<TEditor, TLabeler, TRepeater>,
                protected select: EditorResolutionGroup<TEditor, TLabeler, TRepeater>,
                protected multiEdit: EditorResolutionGroup<TEditor, TLabeler, TRepeater>) {
    }

    getEditorComponents(field: SchemaField): LabeledEditor<TEditor, TLabeler, TRepeater>|null {
        if (field.entryType === SchemaEntryType.entry) {
            if (field.multiple) {
                return this.multiEdit.getEditorParts(field.typeName, field.uiControlPreference)
            } else {
                return this.edit.getEditorParts(field.typeName, field.uiControlPreference);
            }
        } else if (field.entryType === SchemaEntryType.selection) {
            return this.select.getEditorParts(field.typeName, field.uiControlPreference)
        } else throw "Invalid entry type"
    }
}

export function getEditorResolverContext<
    TEditor extends new (...args) => any,
    TLabeler extends new (...args) => any,
    TRepeater extends new (...args) => any>
    (editors: ComponentRegistry, schema: Schema): EditorResolver<TEditor, TLabeler, TRepeater> {
    return new EditorResolverImplementation(
        new EditorResolutionGroup<TEditor, TLabeler, TRepeater>(
            editors.editors, schema, false),
        new EditorResolutionGroup<TEditor, TLabeler, TRepeater>(
            editors.selects,schema, true),
        new EditorResolutionGroup<TEditor, TLabeler, TRepeater>(
            editors.multiEdits,schema, false)
    )
}





