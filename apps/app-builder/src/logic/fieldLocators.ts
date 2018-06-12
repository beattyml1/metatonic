import {AppBuilderState} from "../types/Types";
import {FormSchema, FormNavigator, getDefaultDataForField, getDefaultFormState,isNumeric } from 'metatonic-core'
import {remove} from "./commonFunctions";

export function getTypeForFieldLocator(fieldLocator: string, schema: FormSchema) {
    let value = getDefaultDataForField(schema);
    let navigator = new FormNavigator(schema, value, getDefaultFormState(schema.type, value));
    let property = navigator.locate(fieldLocator);
    let field = property.getField();
    let type = field.type;
    return type;
}

let removeLastIfNumeric = array => array.filter((x, i, a) => !(isNumeric(x) && i === a.length - 1 ));

export function getFieldAndParentType(fieldLocator: string, schema: FormSchema) {
    let value = getDefaultDataForField(schema);
    let navigator = new FormNavigator(schema, value, getDefaultFormState(schema.type, value));
    let property = navigator.locate(fieldLocator);
    let field = property.getField();
    let parentLocator = removeLastIfNumeric(fieldLocator.split('.').slice(0, -1));
    let parentProp = navigator.locate(parentLocator);
    let parentType = parentProp.getField().type;
    return { field, parentType };
}