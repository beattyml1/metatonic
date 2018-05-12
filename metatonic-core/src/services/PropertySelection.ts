import {isNumeric} from "../extensions/Number";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {RecordSchemaType, SchemaField, SchemaType} from "../domain/Schema/Records";
import {findField, getPropertyLocatorArray, typeOfField} from "./FieldNavigationHelpers";
import {FieldState} from "../domain/FieldState/FieldState";
import {copyAndSet} from "../extensions/functional";

export class FormNavigator {
	constructor(public schema: FormSchema, public data, public formState: FieldState) {}
	locate(propertySelector: string) {
		return new PropertySelection(propertySelector, this.schema, this.data, this.formState);
	}
}

export type NavNode = { key, data, state: FieldState };

export class PropertySelection {
    _propertyLocatorArray: (number | string)[];
	constructor(propertySelector: string, public schema: FormSchema, public data, public fieldState: FieldState){
		this._propertyLocatorArray = getPropertyLocatorArray(propertySelector);
	}

	getValue(): any {
		return this._propertyLocatorArray.reduce((result, key) => result[key], this.data);
	}

    getState(): FieldState {
        return this._propertyLocatorArray.reduce((result, key) => result.children[key], this.fieldState);
    }

    getType(currentKey: string, type: SchemaType): SchemaType {
        if (isNumeric(currentKey)) return type;

        let fields = (type as RecordSchemaType).parameters.fields;
        let field = fields.find(f => f.name === currentKey);

        if (!field) return type;

        return field.type;
	}

	getField(): SchemaField {
		let stringKeys = this._propertyLocatorArray.filter(x => !isNumeric(x)) as string[];
		let allButLastStringKeys = stringKeys.slice(0, stringKeys.length-1)
		let type = allButLastStringKeys.reduce(typeOfField, this.schema.type) as RecordSchemaType;
		return findField(type, stringKeys[stringKeys.length - 1])!;
	}

    setValue(value) {
        return this.reverseTraverse((previous, current) => {
            let currentData = previous ? previous.data : value;
            current.data = copyAndSet(current.data, { [current.key]: currentData });
        }).last.data
    }

    setState(state: FieldState) {
        return this.reverseTraverse((previous, current) => {
            let currentState = previous ? previous.state : state;
            current.state = copyAndSet(current.state, {
                children: copyAndSet(current.state.children, {
                    [current.key]: currentState })
            });
        }).last.state
    }

    reverseTraverse(action: (previous, current) => void) {
        let navTree = this.getNavTree();
        let reverseNavTree = navTree.slice().reverse();
        let last: NavNode;

        reverseNavTree.forEach(current => {
            action(last, current);
            last = current;
        });

        return { last: last!, first: reverseNavTree[0], all: reverseNavTree };
    }

    getNavTree() {
	    let currentRecord = this.data;
	    let currentState = this.fieldState;
	    return this._propertyLocatorArray.map(x => {
	        let item ={ key: x, data: currentRecord, state: currentState };
            currentRecord = currentRecord[x];
            currentState = isNumeric(x) ? currentState: currentState.children[x];
            return item;
        });
    }
}