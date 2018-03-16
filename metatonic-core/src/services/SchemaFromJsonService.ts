import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {FormSchema, Schema} from "../domain/Schema/RootSchemas";
import {SchemaFieldInfo} from "../domain/Schema/SchemaFieldInfo";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

export function getFormSchemaFromJsonObject(schema: FormSchema): FormSchema {
	if (!schema.type) schema.type = schema.types[schema.typeName] as RecordSchemaType;
	return Object.assign({}, schema, { type: addTypesToFields(schema.type, schema) });
}

export function addTypeToField(field: SchemaFieldInfo, schema: Schema): SchemaField {
	let type = schema.types[field.typeName];
	return Object.assign({}, field, { type: addTypesToFields(type, schema) });
}

export function addTypesToFields(type: SchemaType, schema: Schema) {
	if (type.category === SchemaTypeCategory.Record) {
		let recordInfo = type.parameters as SchemaRecordTypeParameters;
		return Object.assign({}, type, { parameters: <SchemaRecordTypeParameters> {
			fields: recordInfo.fields.map(_ => addTypeToField(_, schema))
		}});
	}
	return type;
}

