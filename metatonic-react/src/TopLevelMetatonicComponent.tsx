import * as React from "react";
import {FieldEditor} from "./Editors/FieldEditor";
import {SchemaField} from "metatonic-core";
import {createContext} from "metatonic-core";
import {} from 'metatonic-redux/'
import {ReactEditorResolver} from "./Services/ReactEditorService";
import {getDefaultFormState} from "metatonic-core";
import {FormState} from "metatonic-core";
import {FormProperties} from "metatonic-core";
import {FormUserEvents} from "metatonic-core";

export class TopLevelMetatonicComponent<TData> extends React.Component<FormProperties, {}> {
    protected dispatcher: FormUserEvents;
    protected editors: ReactEditorResolver;
    constructor(props, context?) {
        super(props, context);
        this.editors = this.props.editors as ReactEditorResolver;
        this.dispatcher = new FormUserEvents({ dispatch: (this.props.onFormEvent || (() => {}))});
    }

    renderEditor() {
        if (!this.props.editors || !this.props.schema) return <div></div>;
        let field = this.createTopField()
        return (
                <FieldEditor
                    value={this.props.formData}
                    field={field}
                    context={createContext(field)}
                    fieldState={this.props.formState||getDefaultFormState(field.type)}
                    resources={ { editors: this.editors,  formDispatcher: this.dispatcher } }/>
        );
    }

    createTopField() {
        return {
            label: this.props.schema!.type.label,
            uiUniqueId: "",
            type: this.props.schema!.type,
            typeName: this.props.schema!.type.name
        } as SchemaField;
    }
}