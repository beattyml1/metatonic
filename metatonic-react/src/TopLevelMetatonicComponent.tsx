import * as React from "react";
import {FormSchema} from "metatonic-core";
import {Rest} from "metatonic-core";
import {FieldEditor} from "./Editors/FieldEditor";
import {SchemaField} from "metatonic-core";
import {createContext} from "metatonic-core";
import {} from 'metatonic-redux/'
import {startNewFormStateManager} from "metatonic-core";
import {PersistantDataStore} from "metatonic-core";
import {ReactEditorResolver} from "./Services/ReactEditorService";
import {ReduxStateManager} from "metatonic-core";
import {getDefaultFormState} from "metatonic-core";

export class TopLevelMetatonicComponent<TData, TProps> extends React.Component<TProps, {
    schema: FormSchema,
    formData: any
}> {
    protected store: ReduxStateManager;
    protected  editors: ReactEditorResolver;

    renderEditor() {
        let field = this.createTopField()
        return (
                <FieldEditor
                    value={this.state.formData}
                    field={field} context={createContext(field)}
                    fieldState={getDefaultFormState(field.type)}
                    globals={{editors: this.editors, store: this.store}}/>
        );
    }

    createTopField() {
        return {
            label: "",
            uiUniqueId: "",
            type: this.state.schema.type,
            typeName: this.state.schema.type.name
        } as SchemaField;
    }

    async init(formData, schema: FormSchema) {
        this.store = startNewFormStateManager();
        this.store.store.subscribe(() => this.setState(this.store.store.getState()));
        this.store.fullReload(formData, schema);
        this.editors = new ReactEditorResolver(schema);
    }
}