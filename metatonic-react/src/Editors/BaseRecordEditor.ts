import {BaseEditorModel, ComponentContext,SchemaField} from "metatonic-core";
import {RecordSchemaType} from "metatonic-core";
import {createContext} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";

export abstract class BaseRecordEditor <TData extends {}, TProps extends BaseEditorModel<TData>, TState={}>
    extends BaseEditor<TData, RecordSchemaType, TProps, TState> {

    type() {
        return super.type() as RecordSchemaType;
    }

    childProps(name: string) {
        let field = this.type().parameters.fields.find(f => f.name === name);
        return {
            value: this.props.value[name],
            field: field as SchemaField,
            context: createContext(field, this.props.context) as ComponentContext
        }
    }
}