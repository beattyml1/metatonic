import * as React from "react";
import {FieldEditorModel} from "metatonic-core";

export class FieldEditor extends React.Component<FieldEditorModel, {}> {
    render() {
        let editorComponents = this.props.resources.editors.getEditorComponents(this.props.field);
        if (editorComponents) {
            let Editor = editorComponents.editor;
            let Labeler = editorComponents.labeler;
            return this.props.doNotLabel ? <Editor {...this.props}></Editor> :
                <Labeler {...this.props}>
                    <Editor {...this.props}></Editor>
                </Labeler>;
        } else return <div></div>
    }
}

export class FieldDisplay extends React.Component<FieldEditorModel, {}> {
    render() {
        return (
            <div>
                {this.props.field.type}
            </div>
        );
    }
}

export class FieldCell extends React.Component<FieldEditorModel, {isEditing}> {
    constructor(props){
        super(props);
        this.state = { isEditing: true };
    }
    render() {
        if (this.state.isEditing) {
            return <FieldEditor value={this.props.value} field={this.props.field} context={this.props.context} fieldState={this.props.fieldState} resources={this.props.resources} doNotLabel={true}/>
        } else {
            return <FieldDisplay value={this.props.value} field={this.props.field} context={this.props.context} fieldState={this.props.fieldState} resources={this.props.resources}/>
        }
    }
}