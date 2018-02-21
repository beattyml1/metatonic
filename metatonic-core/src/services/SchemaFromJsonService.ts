import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {FormSchema, Schema} from "../domain/Schema/RootSchemas";
import {SchemaFieldInfo} from "../domain/Schema/SchemaFieldInfo";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

export function getFormSchemaFromJsonObject(schema: FormSchema): FormSchema {
	if (!schema.rootType) schema.rootType = schema.types[schema.rootTypeName] as RecordSchemaType;
	return Object.assign({}, schema, { rootType: this.addTypesToFields(schema.rootType, schema) });
}

export function addTypeToField(field: SchemaFieldInfo, schema: Schema): SchemaField {
	let type = schema.types[field.typeName];
	return Object.assign({}, field, { type: this.addTypesToFields(type, schema) });
}

export function addTypesToFields(type: SchemaType, schema: Schema) {
	if (type.category === SchemaTypeCategory.Record) {
		let recordInfo = type.parameters as SchemaRecordTypeParameters;
		return Object.assign({}, type, { parameters: <SchemaRecordTypeParameters> {
			fields: recordInfo.fields.map(_ => this.addTypeToField(_, schema))
		}});
	}
	return type;
}

