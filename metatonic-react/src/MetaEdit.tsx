import * as React from "react";
import {FormSchema} from "metatonic-core";
import {TopLevelMetatonicComponent} from "./TopLevelMetatonicComponent";

type ValueAndSchema<T> = { value:T; schema: FormSchema } | { value: T&{$schema:FormSchema}; schema?: FormSchema };
type Props<T> = ValueAndSchema<T> & { onChange?: (value) => void };
export class MetaEdit<T> extends TopLevelMetatonicComponent<T, Props<T>> {
    constructor(props: Props<T>, context?) {
        super(props, context);
        let schema = this.props.schema || this.props.value['$schema'];
        super.init(this.props.value, schema);
    }

    render() {
        return this.renderEditor();
    }
}