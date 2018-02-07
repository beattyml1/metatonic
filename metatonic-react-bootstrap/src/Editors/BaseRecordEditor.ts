import {BaseEditorModel} from "metatonic-core/src/index";
import {RecordSchemaType} from "metatonic-core/src/index";
import {createContext} from "metatonic-core/src/index";

export abstract class BaseRecordEditor <TData, TProps extends BaseEditorModel<RecordSchemaType>, TState>
    extends BaseEditor<TData, RecordSchemaType, TProps, State> {

    type() {
        return super.type() as RecordSchemaType;
    }

    childProps(name: string) {
        let field = this.type().parameters.fields.find(f => f.name === name);
        return {
            value: this.props.value[name],
            field: field,
            context: createContext(field, this.props.context)
        }
    }
}