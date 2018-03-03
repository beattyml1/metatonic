import {isNumeric} from "../extensions/Number";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {BreakException} from "../CoreTypes";
import {forEachWithBreak} from "../extensions/Array";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {findField, getPropertyLocatorArray, typeOfField} from "./FieldNavigationHelpers";
import {FieldState} from "../domain/FieldState/FieldState";
import {copyAndSet} from "../extensions/functional";

export class FormNavigator {
	constructor(private schema: FormSchema, private data, private formState: FieldState) {}
	locate(propertySelector: string) {
		return new PropertySelection(propertySelector, this.schema, this.data, this.formState);
	}
}

type NavNode = { key, data, state: FieldState };

export class PropertySelection {
    private propertyLocatorArray: (number | string)[];
	constructor(propertySelector: string, private schema: FormSchema, private data, private fieldState: FieldState){
		this.propertyLocatorArray = getPropertyLocatorArray(propertySelector);
	}

	getValue() {
		return this.propertyLocatorArray.reduce((result, key) => result[key], this.data);
	}

    getState() {
        return this.propertyLocatorArray.reduce((result, key) => result.children[key], this.fieldState);
    }

	private getType(currentKey: string, type: SchemaType) {
        if (isNumeric(currentKey)) return type;

        let fields = (type as RecordSchemaType).parameters.fields;
        let field = fields.find(f => f.name === currentKey);

        if (!field) return type;

        return field.type;
	}

	getField() {
		let stringKeys = this.propertyLocatorArray.filter(x => !isNumeric(x)) as string[];
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

    private getNavTree() {
	    let currentRecord = this.data;
	    let currentState = this.fieldState;
	    return this.propertyLocatorArray.map(x => {
	        let item ={ key: x, data: currentRecord, state: currentState };
            currentRecord = currentRecord[x];
            currentState = isNumeric(x) ? currentState: currentState.children[x];
            return item;
        });
    }
}