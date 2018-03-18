import {SchemaType, SchemaField} from "../domain/Schema/Records";

function classesForType(classForType: (x: string) => string) {
    return (type: SchemaType) => type.parentTypeNames.concat(type.name).map(classForType).join(' ');
}

export const inputTypeClasses = classesForType(_ => `input-${_}`);
export const editorTypeClasses = classesForType(_ => `edit-${_}`);
export const containerTypeClasses = classesForType(_ => `contain-${_}`);
export const labelTypeClasses = classesForType(_ => `label-${_}`);

function fieldClasses(getTypeClasses: (type: SchemaType) =>  string){
    return (field: SchemaField) => [getTypeClasses(field.type), `${field.name}-field`].join(' ');
}

export const fieldInputClasses = fieldClasses(inputTypeClasses);
export const fieldEditorClasses = fieldClasses(editorTypeClasses);
export const fieldContainerClasses = fieldClasses(containerTypeClasses);
export const fieldLabelClasses = fieldClasses(labelTypeClasses);

