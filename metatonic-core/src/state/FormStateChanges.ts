import {FormSchema} from "../domain/Schema/RootSchemas";
import {FormNavigator} from "../services/PropertySelection";
import {getFormSchemaFromJsonObject} from '../services/SchemaFromJsonService'
import {FieldState} from "../domain/FieldState/FieldState";
import {getDefaultFormState} from "../services/DefaultFormState";
import {getValidationMessages} from "../services/Validation";
import {FormState} from "../domain/StateManagementTypes";
import {insertAt, removeAt} from "../extensions/Array";
import {getDefaultDataForField} from "../services/DefaultDataService";
import {hasValue} from "../extensions/hasValue";
import {copyAndSet} from "../extensions/functional";
import {addUniqueIdsToChildren} from "../services/IdGeneratorService";
import {FormProperties} from "../domain/EditorModels/FormProperties";
import {ValidationMessageDetailed} from "../domain/contracts/Validation";
import {PropertySelection} from "../services/PropertySelection";

export module FormStateChanges {
	export const getNav = (state: FormState) => new FormNavigator(state.schema, state.formData, state.formState) as FormNavigator;

    export const getProperty = (state: FormState, propertySelector: string) => getNav(state).locate(propertySelector) as PropertySelection

    export function propertyChanged(state: FormState, propertySelector: string, value): FormState{
		let property = getProperty(state, propertySelector)
		let formData = copyAndSet(state.formData, property.setValue(value));

		state = copyAndSet(state, {formData});
		property = getProperty(state, propertySelector);

		let validationMessages = getValidationMessages(property.getField(), property.getValue(), false);
        let fieldState =  copyAndSet(property.getState(), { validationMessages })
        let formState = property.setState(fieldState);

        return copyAndSet(state, { formState });
	}

	export function validateSync (state: FormState) {
        let property = FormStateChanges.getProperty(state, "")
        let validations = getValidationMessages(property.getField(), property.getValue(), true);
        return Object.assign({}, state, {
            formState: Object.assign({},
                state.formState,
                <FieldState> { validationMessages: validations })
        });
    }

    export function initializeFormStateEmpty() {
        return {
            formState: {

            }
        };
    }

    export function finishLoad(state: FormState) {
        return copyAndSet(state, {
            formState: copyAndSet(state.formState, {
                showLoader: false
            })
        });
    }

    export function startLoad(state: FormState) {
        return copyAndSet(state, {
            formState: copyAndSet(state.formState, {
                showLoader: true
            })
        });
    }

    export function startSubmit(state: FormState) {
    	return copyAndSet(state, {
    		formState: copyAndSet(state.formState, {
    			showLoader: true
			})
		});
	}

    export function submitSucceeded(state: FormState, payload: any) {
    	return copyAndSet(state, {
    		formData: payload
		});
    }

    export function submitFailed(state: FormState, payload: { messages: ValidationMessageDetailed[] }) {
        return copyAndSet(state, {
            formState: copyAndSet(state.formState, {
            	validationMessages: payload.messages
			})
        });
	}

	export function submitAttemptFinished(state: FormState) {
        return copyAndSet(state, {
            formState: copyAndSet(state.formState, {
                showLoader: false
            })
        });
	}

    export function itemAdded(state: FormState, propertySelector: string, item?, index?: number): FormState{
        let property = getProperty(state, propertySelector);
		let field = property.getField();

		item = item || getDefaultDataForField(field, true);

		let currentArray = property.getValue();
		let newArray = !hasValue(index) ? [...currentArray, item] : insertAt(currentArray, index, item);
		let indexInsertedAt = hasValue(index) ? index : currentArray.length;

		let form = Object.assign({}, state.formData, property.setValue(newArray));

		let itemFieldState = getDefaultFormState(field.type);
		property.getState().children[indexInsertedAt] = itemFieldState;

		return Object.assign({}, state, { formData: form });
	}

    export function itemRemoved(state: FormState, propertySelector: string, index: number): FormState{
        let property = getProperty(state, propertySelector)
		let currentArray = property.getValue();
		let newArray = removeAt(currentArray, index);
		let form = Object.assign({}, state.formData, property.setValue(newArray));
		return Object.assign({}, state, { formData: form})
	}

    export function propertiesChanged(state: FormState, properties: { property: string, value: any }[]): FormState {
		return properties.reduce((s, p) => propertyChanged(s, p.property, p.value), state);
	}

    export function formServerUpdate(state: FormState, formData: any): FormState {
		return Object.assign({}, state, { formData, serverDocumentData: formData });
	}

    export function fullReload(state: { formProps: FormProperties }, formData: any, schema: FormSchema): FormState {
	    schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(schema), "")
	    formData = formData || getDefaultDataForField(schema)
        let formState = getDefaultFormState(schema.type, formData);
		return {
            formData,
            formProps: state.formProps,
            serverDocumentData: formData,
			formState,
            schema,
            isNew: !!formData.id,
            navigator: new FormNavigator(schema, formData, formState)
        };
	}
}
