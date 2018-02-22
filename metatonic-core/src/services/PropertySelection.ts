import {isNumeric} from "../extensions/Number";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {BreakException} from "../CoreTypes";
import {forEachWithBreak} from "../extensions/Array";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {findField, getPropertyLocatorArray, typeOfField} from "./FieldNavigationHelpers";

export class FormNavigator {
	constructor(private schema: FormSchema, private data) {}
	locate(propertySelector: string) {
		return new PropertySelection(propertySelector, this.schema, this.data);
	}
}

export class PropertySelection {
    private propertyLocatorArray: (number | string)[];
	constructor(propertySelector: string, private schema: FormSchema, private data){
		this.propertyLocatorArray = getPropertyLocatorArray(propertySelector);
	}

	getValue() {
		return this.propertyLocatorArray.reduce((result, key) => result[key], this.data);
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
		let type = allButLastStringKeys.reduce(typeOfField, this.schema.rootType) as RecordSchemaType;
		return findField(type, stringKeys[stringKeys.length - 1])!;
	}

    setValue(value) {
        let navTree = this.getNavTree();
        let reverseNavTree = navTree.slice().reverse();
        let previous;

        reverseNavTree.forEach(current => {
        	if (previous) {
                current.data = Object.assign({}, current.data, { [current.key]: previous });
			} else {
				current.data = Object.assign({}, current.data, { [current.key]: value });
            }
            previous = current.data;
		})
        return previous;
    }

    private getNavTree() {
	    let currentRecord = this.data;
	    return this.propertyLocatorArray.map(x => {
	        let item ={ key: x, data: currentRecord};
            currentRecord = currentRecord[x];
            return item;
        });
    }
}