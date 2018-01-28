import {Schema, FormSchema} from "domain/Schema/RootSchemas";
import { Nullable, Nothing, Maybe } from "CoreTypes";
import {PropertySelection, FormNavigator} from "services/PropertySelection";
import * as _Array from "extensions/Array"
import {getFormSchemaFromJsonObject} from 'services/SchemaFromJsonService'
import {FieldState} from "../domain/FieldState/FieldState";
import {getDefaultFormState} from "../services/DefaultFormState";
import {runFieldValidations} from "../services/Validation";
export enum StateEvents {
	propertyChanged,
	propertiesChanged,
	formServerUpdate,
	fullReload
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}



export type FormEvent<TData, TLocator> = { event: StateEvents; data: TData, locator: TLocator };

export type FormState = {
	formData: any;
	serverDocumentData: any;
	schema: FormSchema;
	formState: FieldState;
	navigator: FormNavigator;
}

export class FormStateChanges {
	constructor() {

	}

	getNav = (state: FormState) => new FormNavigator(state.schema, state.formData);

	getProperty = (state: FormState, propertySelector: string) => this.getNav(state).locate(propertySelector)

	propertyChanged(state: FormState, propertySelector: string, value): FormState{
		let property = this.getProperty(state, propertySelector)
		let form = Object.assign({}, state.formData, property.setValue(value));
		let validations = runFieldValidations(property.getField(), property.getValue());

		return Object.assign({}, state, { formData: form });
	}

	trySubmit(state: FormState) {
        let property = this.getProperty(state, "")
        let validations = runFieldValidations(property.getField(), property.getValue());
        return Object.assign({},
			state, {
				formState: Object.assign({},
					state.formState,
					<FieldState> { validationMessages: validations })
			});
	}

	itemAdded(state: FormState, propertySelector: string, item, index: Nullable<number>): FormState{
        let property = this.getProperty(state, propertySelector)
		let currentArray = property.getValue();
		let newArray = index === null ? currentArray.concat(item) : _Array.insertAt(currentArray, index, item);
		let form = Object.assign({}, state.formData, property.setValue(newArray));
		return Object.assign({}, state, { formData: form})
	}

	itemRemoved(state: FormState, propertySelector: string, index: number): FormState{
        let property = this.getProperty(state, propertySelector)
		let currentArray = property.getValue();
		let newArray = _Array.removeAt(currentArray, index);
		let form = Object.assign({}, state.formData, property.setValue(newArray));
		return Object.assign({}, state, { formData: form})
	}

	propertiesChanged(state: FormState, properties: { property: string, value: any }[]): FormState {
		return properties.reduce((s, p) => Object.assign({}, state, { data: this.propertyChanged(s, p.property, p.value)}), state);
	}

	formServerUpdate(state: FormState, formData: any): FormState {
		return Object.assign({}, state, { formData, serverDocumentData: formData });
	}

	fullReload(state: FormState, formData: any, schema: FormSchema): FormState {
		return {
            formData: formData,
            serverDocumentData: formData,
			formState: getDefaultFormState(schema.rootType),
            schema: getFormSchemaFromJsonObject(schema),
            navigator: new FormNavigator(schema, formData)
        };
	}
}
