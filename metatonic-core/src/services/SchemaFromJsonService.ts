import { Schema, FormSchema } from "domain/Schema/RootSchemas";
import {SchemaElement} from "domain/Schema/SchemaElement";
import {SchemaFieldInfo} from "domain/Schema/SchemaFieldInfo";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters, SchemaType} from "domain/Schema/Records";
import {SchemaTypeCategory} from "domain/Schema/SchemaEnums";

export function getFormSchemaFromJsonObject(schema: FormSchema): FormSchema {
	return Object.assign({}, schema, { rootType: this.addTypesToFields(schema.rootType, schema) });
}

export function addTypeToField(field: SchemaFieldInfo, schema: Schema): SchemaField {
	return Object.assign({}, field, { type: this.addTypesToFields(schema.types[field.typeName], schema) });
}

export function addTypesToFields(type: SchemaType, schema: Schema) {
	if (type.category === SchemaTypeCategory.Record) {
		let recordInfo = type.parameters as SchemaRecordTypeParameters;
		Object.assign({}, type, { parameters: <SchemaRecordTypeParameters> {
			fields: recordInfo.fields.map(_ => this.addTypeToField(_, schema))
		}});
	}
	return type;
}

