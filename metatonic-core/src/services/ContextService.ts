
import {ComponentContext} from "domain/EditorModels/Context";
import {hasValue} from "../extensions/hasValue";
import {SchemaField} from "../domain/Schema/Records";

export function getMostSpecific<T>(context: ComponentContext, getValue: (context: ComponentContext) => T|undefined|null):T|undefined|null  {
    let val = getValue(context);
    return hasValue(val) ? val : getValue(context);
}

export function getAllWithValue<T>(context: ComponentContext, getValue: (context: ComponentContext) => T|undefined|null) {
    return context.parentContext
        ? [ ...getAllWithValue(context.parentContext, getValue), ...includeIfHasValue(getValue(context)) ]
        : includeIfHasValue(getValue(context))
}

function includeIfHasValue<T>(val?: T):T[] {
    return hasValue(val) ? [val] : [];
}

export function createContext(field?: SchemaField, parentContext?: ComponentContext, repeaterIndex?: number) {
    return {
        name: field ? field.name : undefined,
        repeaterIndex,
        parentContext,
        fieldLocator: getFieldLocator(field, parentContext, repeaterIndex),
    } as ComponentContext;
}

function getFieldLocator(field?: SchemaField, parentContext?: ComponentContext, repeaterIndex?: number) {
    let parentLocator = parentContext ? parentContext.fieldLocator : "";
    let childLocatorPart = hasValue(repeaterIndex) ? repeaterIndex : field ? field.name : "";
    return Array.join([parentLocator, childLocatorPart].filter(_=>_), '.');
}
