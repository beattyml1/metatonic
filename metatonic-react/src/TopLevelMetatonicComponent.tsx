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
import {getDefaultFormState, getDefaultDataForField} from "metatonic-core";
import {MetatonicResources} from "metatonic-core";
import {FormState} from "metatonic-core";
import {Store} from "redux";
import {MetatonicFormEventDispatcher} from "metatonic-core";

export class TopLevelMetatonicComponent<TData, TProps extends { resources: MetatonicResources }> extends React.Component<TProps, {
    schema: FormSchema,
    formData: any
}> {
    protected dispatcher: MetatonicFormEventDispatcher;
    protected reduxStore: Store<FormState>;
    protected  editors: ReactEditorResolver;
    constructor(props, context?) {
        super(props, context);
        this.dispatcher = this.props.resources.formDispatcher;
        this.reduxStore = this.props.resources.formStore;
        this.editors = this.props.resources.editors as ReactEditorResolver;
        this.reduxStore.subscribe(this.setStateFromStore);
    }

    renderEditor() {
        if (!this.state) return <div></div>;
        let field = this.createTopField()
        return (
                <FieldEditor
                    value={this.state.formData}
                    field={field} context={createContext(field)}
                    fieldState={getDefaultFormState(field.type)}
                    resources={this.props.resources}/>
        );
    }

    setStateFromStore() {
        let state = this.reduxStore.getState();
        this.setState(state);
    }

    createTopField() {
        return {
            label: "",
            uiUniqueId: "",
            type: this.state.schema.type,
            typeName: this.state.schema.type.name
        } as SchemaField;
    }
}