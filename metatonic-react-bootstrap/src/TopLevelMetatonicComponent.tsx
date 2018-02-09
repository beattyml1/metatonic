import * as React from "react";
import {FormSchema} from "../../metatonic-core/src/domain/Schema/RootSchemas";
import {Rest} from "metatonic-core/src/services/Rest";
import {FieldEditor} from "./Editors/FieldEditor";
import {SchemaField} from "../../metatonic-core/src/domain/Schema/Records";
import {createContext} from "../../metatonic-core/src/services/ContextService";
import {} from 'metatonic-redux/'
import {startNewFormStateManager} from "metatonic-core/src/state/ReduxStateManager";
import {PersistantDataStore} from "metatonic-core/src/state/PersistantDataStore";
import {ReactEditorResolver} from "./Services/ReactEditorService";
import {ReduxStateManager} from "metatonic-core/src/state/ReduxStateManager";
import {getDefaultFormState} from "../../metatonic-core/src/services/DefaultFormState";

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
            type: this.state.schema.rootType,
            typeName: this.state.schema.rootType.name
        } as SchemaField;
    }

    async init(formData, schema: FormSchema) {
        this.store = startNewFormStateManager();
        this.store.store.subscribe(() => this.setState(this.store.store.getState()));
        this.store.fullReload(formData, schema);
        this.editors = new ReactEditorResolver(schema);
    }
}