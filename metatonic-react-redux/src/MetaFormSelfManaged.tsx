import * as React from "react";
import {FormProperties, FormState} from 'metatonic-core';
import { MetaForm } from "metatonic-react";

export class MetaFormSelfManaged extends React.Component<FormProperties, FormState> {
    combinePropsAndStateToChildProps() {
        let props = this.props as FormProperties;
        let state = this.state as FormState;
    }
    render() {

        return (
            <MetaForm {...this.props} />
        );
    }
}