import * as React from "react";
import {BaseEditorModel} from "metatonic-core/src/index";
import {BaseEditor} from "Editors/BaseEditor";
import {SchemaRecordTypeParameters} from "metatonic-core/src/index";

export class SearchSelector extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, { searchText: string }> {
    render() {
        return  <div>
           <input type="text" value={this.state.searchText} id={this.uniqueId()} onKeyUp={this.doSearch} />
        </div>
        ;
    }

    doSearch() {
        let element = document.getElementById(this.uniqueId()) as HTMLInputElement;
        this.searchFor(element.value)
    }

    searchFor(text: string) {

    }
}