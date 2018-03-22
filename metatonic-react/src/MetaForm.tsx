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
    afterLoad?: () => void
}

export class MetaForm<T = any> extends TopLevelMetatonicComponent<T, MetaFormProps> {
    constructor(props: MetaFormProps, context?) {
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
        this.store.trySubmit();
    }
    
    componentDidMount() {
        this.init().then(() => {
            if (this.props.afterLoad) {
                this.props.afterLoad
            }
        })
    }

    async init() {
        let resource = this.props.dataStore.records(this.props.recordName);
        let formData = await resource.getOne(this.props.recordId||"new");
        let schema = await resource.schema();
        return await super.init(formData, schema);
    }
}