import * as React from "react";
import {FormSchema} from "../../metatonic-core/src/domain/Schema/RootSchemas";
import {Rest} from "metatonic-core/src/services/Rest";
import {FieldEditor} from "./Editors/FieldEditor";
import {SchemaField} from "../../metatonic-core/src/domain/Schema/Records";
import {createContext} from "../../metatonic-core/src/services/ContextService";
import {} from 'metatonic-redux/'
import {startNewFormStateManager} from "metatonic-core/src/state/redux-state-manager";
import {PersistantDataStore} from "metatonic-core/src/state/PersistantDataStore";

export class MetaForm extends React.Component<{
    formName?: string,
    recordName?: string,
    recordId?: string,
    title?: string,
    dataStore: PersistantDataStore
}, {
    schema: FormSchema,
    field: SchemaField,
    data: any
}> {
    private store: ReduxStateManager;
    constructor() {
        super();
        this.init();
    }

    render() {
        let field = this.createTopField()
        return (
            <form onSubmit={this.submit}>
                <FieldEditor value={this.state.value} field={field} context={createContext(field)} fieldState={}/>
                <button type="button" class="secondary">Cancel</button>
                <button type="submit" class="primary">Save</button>
            </form>
        );
    }

    createTopField() {
        return {
            label: this.props.title,
            uiUniqueId: "",
            type: this.state.schema.rootType,
            typeName: this.state.schema.rootType.name
        } as SchemaField;
    }

    async init() {
        this.store = startNewFormStateManager();
        this.store.store.subscribe(() => this.setState(store.store.getState()));
        let resource = this.props.dataStore.records(this.props.recordName);
        let data = await resource.getOne(this.props.recordId);
        let schema = await resource.schema();
        this.store.fullReload(data, schema);
    }
}