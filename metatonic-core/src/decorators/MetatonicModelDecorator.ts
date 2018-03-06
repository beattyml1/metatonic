import {MetatonicType, SchemaEntryType, SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {
    ComparableValueDataType, ComparableValueDataTypeConstructor, ComparableValueDataTypeStatic,
    ValueDataType, ValueDataTypeConstructor
} from "../Data/BaseDataTypes";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {OptionalProps} from "../CoreTypes";
import {copyAndSet} from "../extensions/functional";
import {type} from "../../test/TestSchema";

type Type = MetatonicType | (new (...args) => any)| ((...args) => any);

export function model(label?: string, params?: OptionalProps<SchemaRecordTypeParameters>&{uiControlPreference}) {
    return function (constructor) {
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

let getField = function (fieldTypeName: string, propertyKey: string, label: string, editSelect: SchemaEntryType, options?: OptionalProps<SchemaField>) {
    return Object.assign({
        typeName: fieldTypeName,
        name: propertyKey,
        label: label,
        entryType: editSelect,
    } as SchemaField, options || {});
};


export function field (
    type: Type,
    label: string,
    editSelect: SchemaEntryType,
    options?: OptionalProps<SchemaField>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor):void {
        let fieldTypeName = getTypeName(type);
        let parentTypeName = getTypeName(target.constructor);
        let parentTypeSchema = getRecordSchema(parentTypeName);
        if (!parentTypeSchema)  parentTypeSchema = handleFieldWithNoModelAttribute(target.constructor)
        parentTypeSchema.parameters.fields.push(getField(fieldTypeName, propertyKey, label, editSelect, options));
    }
}

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

export function list (
    type: MetatonicType | ((...args) => any),
    label: string,
    editSelect: SchemaEntryType,
    options: {
        required: boolean,
        max: number,
        min: number,
        maxLength: number,
        canAdd: boolean
    }) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}