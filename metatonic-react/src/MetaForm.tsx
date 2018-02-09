import * as React from "react";
import {} from 'metatonic-redux/'
import {PersistantDataStore} from "metatonic-core";
import {TopLevelMetatonicComponent} from "./TopLevelMetatonicComponent";

export type MetaFormProps= {
    formName?: string,
    recordName: string,
    recordId?: string,
    title?: string,
    dataStore: PersistantDataStore
}

export class MetaForm<T = any> extends TopLevelMetatonicComponent<T, MetaFormProps> {
    constructor(props: MetaFormProps, context?) {
        super(props, context);
        this.init();
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
        this.store.trySubmit();
    }

    async init() {
        let resource = this.props.dataStore.records(this.props.recordName);
        let formData = await resource.getOne(this.props.recordId||"new");
        let schema = await resource.schema();
        super.init(formData, schema);
    }
}