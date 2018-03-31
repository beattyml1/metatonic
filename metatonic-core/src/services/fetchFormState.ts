import {getTsModels} from "../decorators/MetatonicModelDecorator";
import {getEditorResolverContext} from "./EditorResolver";
import {MetatonicResources} from "../domain/MetatonicResources";
import {MetatonicContext} from "../MetatonicApp.interfaces";
import {getDefaultFormState} from "./DefaultFormState";
import {getDefaultDataForField, getDefaultSingleEdit} from "./DefaultDataService";
import {SchemaField} from "../domain/Schema/Records";
import {addUniqueIdsToChildren} from "./IdGeneratorService";
import {getFormSchemaFromJsonObject} from "./SchemaFromJsonService";
import {FormSchema} from "../domain/Schema/RootSchemas";

export async function fetchInitialFormState(context: MetatonicContext, recordName: string, recordId) {
    let resource = this.dataStore.records(recordName);;
    let serverSchema = await this.dataStore.records(recordName).schema();
    let schemaTypes = getTsModels().reduce((schema, model) => Object.assign({[model.name]: model }, schema), serverSchema);
    let schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(schemaTypes), '')
    let editorResolver = getEditorResolverContext(context.componentRegistry, schema);
    let formData = await resource.getOne(recordId||"new") || getDefaultSingleEdit(schema.type);
    let formState = getDefaultFormState(schema.type);
    return {
        recordName,
        recordId,
        formData,
        schema,
        formState,
        editors: editorResolver,
    }
}