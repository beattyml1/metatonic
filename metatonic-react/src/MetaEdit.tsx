import * as React from "react";
import {FormSchema} from "metatonic-core";
import {TopLevelMetatonicComponent} from "./TopLevelMetatonicComponent";
import {FormProperties} from "metatonic-core";

export class MetaEdit<T> extends TopLevelMetatonicComponent<T> {
    constructor(props: FormProperties, context?) {
        super(props, context);

    }

    render() {
        return this.renderEditor();
    }
}