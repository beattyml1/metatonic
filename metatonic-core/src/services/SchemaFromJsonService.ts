import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {FormSchema, Schema} from "../domain/Schema/RootSchemas";
import {SchemaFieldInfo} from "../domain/Schema/SchemaFieldInfo";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {hasValue} from "../extensions/hasValue";
import {SchemaValidation, ValidationSeverity, ValidationTime} from "../domain/Schema/SchemaValidation";

export function getFormSchemaFromJsonObject(schema: FormSchema): FormSchema {
	if (!schema.type) schema.type = schema.types[schema.typeName] as RecordSchemaType;
	return Object.assign({}, schema, { type: addTypesToFields(schema.type, schema), validations: (schema as FormSchema).validations || [] });
}

export function addTypeToField(field: SchemaFieldInfo, schema: Schema): SchemaField {
	let type = schema.types[field.typeName];

	return Object.assign(field, {
		type: addTypesToFields(type, schema),
		validations: addDefaultValidations(field)
	});
}

function addDefaultValidations(field: SchemaFieldInfo): SchemaValidation[] {
    return [
        ...field.validations,
        ...addValidation(hasValue(field.min))({
            name: 'min',
            parameters: field.min,
            time: ValidationTime.Save,
            label: 'min',
            severity: ValidationSeverity.Error
        }),
        ...addValidation(hasValue(field.min))({
            name: 'max',
            parameters: field.max,
            time: ValidationTime.Save,
            label: 'max',
            severity: ValidationSeverity.Error
        }),
        ...addValidation(hasValue(field.required))({
            name: 'required',
            parameters: field.required,
            time: ValidationTime.Save,
            label: 'required',
            severity: ValidationSeverity.Error
        }),
        ...addValidation(hasValue(field.maxLength))({
            name: 'maxLength',
            parameters: field.maxLength,
            time: ValidationTime.Save,
            label: 'maxLength',
            severity: ValidationSeverity.Error
        })
    ]
}

function addValidation(hasValidation: boolean): (validation: SchemaValidation) => SchemaValidation[] {
	return (validation: SchemaValidation) => hasValidation ? [ validation ] : [];
}

export function addTypesToFields(type: SchemaType, schema: Schema): SchemaType {
	if (type.category === SchemaTypeCategory.Record) {
		let recordInfo = type.parameters as SchemaRecordTypeParameters;
		return Object.assign({}, type, { parameters: <SchemaRecordTypeParameters> {
			fields: recordInfo.fields.map(_ => addTypeToField(_, schema))
		}});

	}
	return type;
}

