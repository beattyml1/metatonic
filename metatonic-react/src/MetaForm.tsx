import * as React from "react";
import {} from 'metatonic-redux/'
import {PersistentDataStore} from "metatonic-core";
import {TopLevelMetatonicComponent} from "./TopLevelMetatonicComponent";
import {FormProperties} from "metatonic-core";

export class MetaForm<T = any> extends TopLevelMetatonicComponent<T> {
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

    submit = (e) => {
        e.preventDefault()
        this.dispatcher.trySubmit();
    }
}