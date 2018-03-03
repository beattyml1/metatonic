import {Schema, FormSchema} from "../domain/Schema/RootSchemas";
import {Nullable, Nothing, Maybe, OptionalProps} from "../CoreTypes";
import {FormNavigator} from "../services/PropertySelection";
import {getFormSchemaFromJsonObject} from '../services/SchemaFromJsonService'
import {FieldState} from "../domain/FieldState/FieldState";
import {getDefaultFormState} from "../services/DefaultFormState";
import {getValidationMessages} from "../services/Validation";
import {StateEvents, FormEvent, FormState} from "../domain/StateManagementTypes";
import {insertAt, removeAt} from "../extensions/Array";
import {getDefaultDataForField} from "../services/DefaultDataService";
import {hasValue} from "../extensions/hasValue";
import {copyAndSet} from "../extensions/functional";

export class FormStateChanges {
	getNav = (state: FormState) => new FormNavigator(state.schema, state.formData, state.formState);

	getProperty = (state: FormState, propertySelector: string) => this.getNav(state).locate(propertySelector)

	propertyChanged(state: FormState, propertySelector: string, value): FormState{
		let property = this.getProperty(state, propertySelector)
		let formData = copyAndSet(state.formData, property.setValue(value));

		state = copyAndSet(state, {formData});
		property = this.getProperty(state, propertySelector);

		let validationMessages = getValidationMessages(property.getField(), property.getValue(), false);
        let fieldState =  copyAndSet(property.getState(), { validationMessages })
        let formState = property.setState(fieldState);

        return copyAndSet(state, { formState });
	}

	trySubmit(state: FormState) {
        let property = this.getProperty(state, "")
        let validations = getValidationMessages(property.getField(), property.getValue(), true);
        return Object.assign({},
			state, {
				formState: Object.assign({},
					state.formState,
					<FieldState> { validationMessages: validations })
			});
	}

	itemAdded(state: FormState, propertySelector: string, item, index?: number): FormState{
	    let property = this.getProperty(state, propertySelector)
		let currentArray = property.getValue();
		let newArray = !hasValue(index) ? [...currentArray, item] : insertAt(currentArray, index, item);
		let form = Object.assign({}, state.formData, property.setValue(newArray));
		return Object.assign({}, state, { formData: form})
	}

	itemRemoved(state: FormState, propertySelector: string, index: number): FormState{
        let property = this.getProperty(state, propertySelector)
		let currentArray = property.getValue();
		let newArray = removeAt(currentArray, index);
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
	    schema = getFormSchemaFromJsonObject(schema)
        let formState = getDefaultFormState(schema.type);
		return {
            formData: formData || getDefaultDataForField(schema),
            serverDocumentData: formData,
			formState,
            schema,
            navigator: new FormNavigator(schema, formData, formState)
        };
	}
}

export const formStateChanges = new FormStateChanges();
