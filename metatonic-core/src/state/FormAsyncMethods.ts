import {FormState} from "../domain/StateManagementTypes";
import {FieldState} from "../domain/FieldState/FieldState";
import {RecordResource} from "./PersistentDataStore";
import {MetatonicContext} from "../MetatonicApp.interfaces";
import {getTsModels} from "../decorators/MetatonicModelDecorator";
import {addUniqueIdsToChildren} from "../services/IdGeneratorService";
import {getFormSchemaFromJsonObject} from "../services/SchemaFromJsonService";
import {EditorResolver, getEditorResolverContext} from "../services/EditorResolver";
import {getDefaultFormState} from "../services/DefaultFormState";
import {getDefaultSingleEdit} from "../services/DefaultDataService";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {RecordSchemaType} from "../domain/Schema/Records";
import {UnitService} from "../services/UnitService";
import {SelectOptionsService} from "../services/SelectOptionsService";
import {forEachFieldRecurse} from "../services/FieldRecurse";

export class FormAsyncMethods {
    public units: UnitService;
    public options: SelectOptionsService;
    constructor(private context: MetatonicContext) {
        this.units = new UnitService(this.context.dataStore);
        this.options = new SelectOptionsService(this.context.dataStore);
    }
    resource(recordName): RecordResource<any> {
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
        let schemaTypes = getTsModels().reduce((schema, model) => Object.assign({[model.name]: model}, schema), serverSchema.types);
        let schemaUnexpanded = {...serverSchema, types: schemaTypes, typeName: recordName };

        let schema = addUniqueIdsToChildren(getFormSchemaFromJsonObject(schemaUnexpanded), '');

        await this.addAsyncSchemaInfo(schema);

        let editorResolver = getEditorResolverContext(this.context.componentRegistry, schema);
        let formData = await this.fetchFormData(schema.type, recordId);
        let formState = getDefaultFormState(schema.type, formData);
        return {
            recordName,
            recordId,
            schema: schema as FormSchema,
            formState: formState as FieldState,
            formData: formData as any,
            editors: editorResolver as EditorResolver<any, any, any>,
        };
    }

    async addAsyncSchemaInfo(schema: FormSchema) {
        return await forEachFieldRecurse(schema.type.parameters, async field => {
            await this.options.addSelectOptions(field);
            await this.units.addUnitData(field)
        });
    }
}