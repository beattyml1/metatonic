import * as React from "react";
import {BaseEditorModel} from "metatonic-core";
import {BaseEditor} from "../Editors/BaseEditor";
import {SchemaRecordTypeParameters, fieldInputClasses} from "metatonic-core";

export class SearchSelector extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, { searchText: string }> {
    render() {
        return  <div>
           <input type="search"
                  value={this.state.searchText}
                  id={this.uniqueId()}
                  onKeyUp={this.doSearch}
                  className={fieldInputClasses(this.field())} />
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