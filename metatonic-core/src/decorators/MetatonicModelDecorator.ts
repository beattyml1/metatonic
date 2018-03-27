import {MetatonicType, SchemaEntryType, SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {
    ComparableValueDataType, ComparableValueDataTypeConstructor, ComparableValueDataTypeStatic,
    ValueDataType, ValueDataTypeConstructor
} from "../data/BaseDataTypes";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {OptionalProps} from "../CoreTypes";
import {copyAndSet} from "../extensions/functional";

type Type = MetatonicType | (new (...args) => any)| ((...args) => any);

export function model(label?: string, params?: OptionalProps<SchemaRecordTypeParameters>&{uiControlPreference}) {
    return function (constructor): void {
        let existing = getRecordSchema(constructor.name);
        let type = {
            name: constructor.name,
            label: label || constructor.name,
            category: SchemaTypeCategory.Record,
            parentTypeNames: getParentTypeNames(constructor),
            parameters: copyAndSet(params as SchemaRecordTypeParameters, {
                fields: existing ? existing.parameters.fields || [] : []
            }),
            id: getId(),
            uiControlPreference: params ? params.uiControlPreference : undefined
        } as RecordSchemaType;
        if (existing) {
           recordTypes.splice(recordTypes.indexOf(existing), 1, type);
        } else recordTypes.push(type);
    }
}
let recordTypes: RecordSchemaType[] = [];
let id = 1;
function getId() {
    return `$ts_id_${id}`
}

export function clearTsModels() {
    recordTypes = [];
}

export function getTsModels() {
    return recordTypes;
}

function getParentTypeNames(constructor) {
    return getPrototypes(constructor.__proto__).map(x=>x.name);
}

function getPrototypes(object) {
    let hasParent = object && object.__proto__ && object.__proto__ !== Object;
    let result = hasParent && object.name ? [object, ...getPrototypes(object.__proto__)] : [];
    return result;
}

export function valueType() {
    return function (constructor: ComparableValueDataTypeConstructor){

    }
}

let getField = function (fieldTypeName: string, propertyKey: string, label: string, editSelect: SchemaEntryType, isMulti: boolean, options?: OptionalProps<SchemaField>) {
    return Object.assign({
        typeName: fieldTypeName,
        name: propertyKey,
        label: label,
        multiple: isMulti,
        entryType: editSelect,
    } as SchemaField, options || {});
};

function fieldAttribute(isMulti: boolean = false, editSelect: SchemaEntryType = SchemaEntryType.entry) {
    return function (
        type: Type,
        label: string,
        options?: OptionalProps<SchemaField>) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
            let fieldTypeName = getTypeName(type);
            let parentTypeName = getTypeName(target.constructor);
            let parentTypeSchema = getRecordSchema(parentTypeName);
            if (!parentTypeSchema)  parentTypeSchema = handleFieldWithNoModelAttribute(target.constructor)
            parentTypeSchema.parameters.fields.push(getField(fieldTypeName, propertyKey, label, editSelect, isMulti, options));
        }
    }
}

export const field = fieldAttribute(false);
export const list = fieldAttribute(true);
export const select = fieldAttribute(false, SchemaEntryType.selection);

function handleFieldWithNoModelAttribute(target) {
    if (target && target.name) {
        model()(target);
        return getRecordSchema(getTypeName(target))!;
    } else throw 'Field must be part of a model';
}

function getTypeName(type: Type) {
    return typeof type === 'string' ? type : type.name;
}

function getRecordSchema(typeName) {
    return recordTypes.find(t => t.name === typeName)
}