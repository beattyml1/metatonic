import {isNumeric} from "../extensions/Number";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters} from "../domain/Schema/Records";
import {BreakException} from "../CoreTypes";
import {forEachWithBreak} from "../extensions/Array";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

export class FormNavigator {
	constructor(private schema: FormSchema, private data) {}
	locate(propertySelector: string) {
		return new PropertySelection(propertySelector, this.schema, this.data);
	}
}

export class PropertySelection {
    private propertyLocatorArray: (number | string)[];
	constructor(propertySelector: string, private schema: FormSchema, private data){
		this.propertyLocatorArray = this.getPropertyLocatorArray(propertySelector);
	}

	getValue() {
		return this.propertyLocatorArray.reduce((result, key) => result[key], this.data);
	}

	getField() {
		let key = "";
		let parentType =this.propertyLocatorArray.reduce((type, key, currentIndex) => {
            // TODO: Return type if it is the last string item in the property locator array and set key
            if (isNumeric(key)) return type;
            let fields = (type as RecordSchemaType).parameters.fields;
            let field = fields.find(f => f.name === key);
            if (!field) return type;
            return field.type;
        }, this.schema.rootType)
        return (parentType as RecordSchemaType).parameters.fields.find(f => f.name === key);
	}

    setValue(value) {
        let metaData = this.getFieldMetaData(this.schema);
        let currentRecord = this.data;
        let navTree = metaData.map(x => (currentRecord = currentRecord[x.key], { field: x.field, key: x.key,  data: currentRecord }));
        let reverseNav = navTree.reverse();
        let previous;
        reverseNav.forEach(current => {
        	if (previous) {
        		current.data = Object.assign({}, { [current.key]: previous.data } );
			} else {
				current.data = Object.assign({}, { [current.key]: value });
            }
            previous = current.data;
		})
    }

    private getFieldMetaData(schema: FormSchema) {
		let type = schema.rootType.parameters;
		let field: SchemaField;
		let nodes = new Array<{key: number|string, field?: SchemaField}>(0);

		forEachWithBreak(this.propertyLocatorArray, key => {
			field = type.fields.find(f => f.name === key)!;
            nodes.push({ key, field });
			if (field.type.category === SchemaTypeCategory.Record) {
				type = field.type.parameters as SchemaRecordTypeParameters;
			} else throw new BreakException();
		});

        return nodes;
    }

	private getPropertyLocatorArray(propertySelector: string) {
		return propertySelector.split('.').map(prop => isNumeric(prop) ? parseFloat(prop) : prop);
	}
}