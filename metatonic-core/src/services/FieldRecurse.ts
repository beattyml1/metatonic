import {SchemaField, SchemaRecordTypeParameters, SchemaType} from "../domain/Schema/Records";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

export function forEachFieldRecurse(type: SchemaRecordTypeParameters, func: (field: SchemaField) => void|Promise<any>) {
    let awaits = new Array<Promise<any>|void>();
    type.fields.forEach(f => {
        awaits.push(func(f));
        if (f.type.category === SchemaTypeCategory.Record) {
            awaits.push(forEachFieldRecurse(f.type.parameters as SchemaRecordTypeParameters, func));
        }
    })
    return Promise.all(awaits);
}
