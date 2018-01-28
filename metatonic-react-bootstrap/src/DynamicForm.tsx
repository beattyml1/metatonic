import * as React from "react";
import {RecordEditor} from "./Editors/RecordEditor";
import {FormSchema} from "core/domain/Schema/RootSchemas";
import {createContext} from "core/services/ContextService";
import {FieldEditor} from "./Editors/FieldEditor";

export default class DynamicForm extends React.Component<{ data: any, schema: FormSchema }, any> {
    render() {
        return (
            <form>
                <FieldEditor value={this.props.data} field={this.props.schema} context={createContext()}></FieldEditor>
            </form>
        );
    }
}