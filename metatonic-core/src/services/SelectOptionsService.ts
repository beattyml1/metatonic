import {PersistentDataStore} from "../state/PersistentDataStore";
import {SchemaField, SchemaRecordTypeParameters, RecordSchemaType} from "../domain/Schema/Records";
import {ItemSelectionType} from "../domain/Schema/ItemSelectionType";

export class SelectOptionsService {
    constructor(public store: PersistentDataStore) {

    }

    async addSelectOptions(field: SchemaField) {
        let type = field.type as RecordSchemaType;
        let optionsSpec = type.parameters as ItemSelectionType<any>;
        let resource = this.store.records(type.name);
        optionsSpec.items = resource.getMany(optionsSpec.group, optionsSpec.params);
    }
}