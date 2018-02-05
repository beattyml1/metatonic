import {Rest} from "Rest";
import {FormSchema} from "domain/Schema/RootSchemas";
import {getFormSchemaFromJsonObject} from 'SchemaFromJsonService'

export async function getInitialFormState(form: string, recordType: string, recordId: string) {
    let result = await Rest.Get<{data, schema: FormSchema}>(`/api/records/${recordType}`, {id: recordId});
    let formSchema = getFormSchemaFromJsonObject(result.schema);
}