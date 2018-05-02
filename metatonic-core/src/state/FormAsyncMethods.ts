import {FormEvents, FormState} from "../domain/StateManagementTypes";
import {FormStateChanges} from "./FormStateChanges";
import {FieldState} from "../domain/FieldState/FieldState";
import {getValidationMessages} from "../services/Validation";
import {PersistantDataStore} from "./PersistantDataStore";
import {fetchInitialFormState} from "../services/fetchFormState";
import {MetatonicContext} from "../MetatonicApp.interfaces";
import {getTsModels} from "../decorators/MetatonicModelDecorator";
import {addUniqueIdsToChildren} from "../services/IdGeneratorService";
import {getFormSchemaFromJsonObject} from "../services/SchemaFromJsonService";
import {getEditorResolverContext} from "../services/EditorResolver";
import {getDefaultFormState} from "../services/DefaultFormState";
import {getDefaultSingleEdit} from "../services/DefaultDataService";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {RecordSchemaType} from "../domain/Schema/Records";

export class FormAsyncMethods {
    constructor(private context: MetatonicContext) {

    }
    resource(recordName) {
        return this.context.dataStore.records(recordName);
    }

    async doSubmit(state: FormState) {
        let resource =  this.context.dataStore.records(state.schema.typeName);
        let isNew = !state.formData.id || state.formData.id === 'new'
        let submit = isNew ? resource.create : resource.update;
        let submitted = submit(state.formData);
        return submitted
    }

    async fetchFormData(type: RecordSchemaType, recordId) {
        return await this.resource(type.name).getOne(recordId||"new") || getDefaultSingleEdit(type);
    }

    async fetchInitialFormState(recordName: string, recordId) {
        let serverSchema = await this.resource(recordName).schema();
        let schemaTypes = getTsModels().reduce((schema, model) => Object.assign({[model.name]: model }, schema), serverSchema);
        let schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(schemaTypes), '')
        let editorResolver = getEditorResolverContext(this.context.componentRegistry, schema);
        let formState = getDefaultFormState(schema.type);
        let formData = await this.fetchFormData(schema.type, recordId);
        return {
            recordName,
            recordId,
            schema,
            formState,
            formData,
            editors: editorResolver,
        };
    }
}