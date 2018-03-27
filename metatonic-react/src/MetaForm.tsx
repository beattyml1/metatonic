import * as React from "react";
import {} from 'metatonic-redux/'
import {PersistantDataStore} from "metatonic-core";
import {TopLevelMetatonicComponent} from "./TopLevelMetatonicComponent";
import {FormProperties} from "../../metatonic-core/src/domain/EditorModels/FormProperties";

export class MetaForm<T = any> extends TopLevelMetatonicComponent<T, FormProperties> {
    constructor(props: FormProperties, context?) {
        super(props, context);
        
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                {this.renderEditor()}
                <button type="button" className="secondary">Cancel</button>
                <button type="submit" className="primary">Save</button>
            </form>
        );
    }

    submit() {
        this.dispatcher.trySubmit();
    }
}