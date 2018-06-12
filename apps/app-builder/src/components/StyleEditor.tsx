import * as React from "react";
import {connect} from "react-redux";
import {AppBuilderActions} from "../types/Types";
import './StyleEditor.css'
import AceEditor from 'react-ace'
export class StyleEditor extends React.Component<{
    styles: string,
    compiler: (_: string) => string,
    Editor: any,
    onChange: (text) => any,
    onEditorLoad: (editor, compiler) => void,
    onApply: (styles) => void }, {}> {
    render() {
        return (
            <div className={"style-editor-container"}>
                <button onClick={this.apply}>Apply</button>
                <AceEditor
                    mode="css"
                    theme="github"
                    name="blah2"
                    onChange={this.props.onChange}
                    fontSize={13}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.props.styles}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}/>
            </div>
        );
    }

    loadEditor = async () => {
        // let AceEditor = await import('react-ace')
        // let compiler = await import('sass')
        // this.props.onEditorLoad(AceEditor, compiler.renderSync)
    }

    apply = () => {
        // if (sass) {
        //     this.props.onApply(sass.renderSync(this.props.styles))
        // } else
            this.props.onApply(this.props.styles)
    }
}

export const StyleEditorBound = connect(
    (state:any) => ({styles: state.styles as string, compiler: _ => _, Editor: state.CodeEditor }),
    (dispatch:any) => ({
        onChange: (text) => dispatch({ type: AppBuilderActions.StylesChanged, payload: text}),
        onEditorLoad: (editor, compiler) => dispatch({ type: AppBuilderActions.StyleEditorLoaded, payload: {editor, compiler}}),
        onApply: (text) => dispatch({ type: AppBuilderActions.StylesApplied, payload: text})
    })
)(StyleEditor)