# metatonic-platform
Work in progress don't expect anything to work. I'd love your help as long as your down with the [Code of Conduct](CodeOfConduct.md)

# Examples

## Record Editor
````javascript
@editorFor("record", FieldSet, {isDefault: true})
export class RecordEditor extends BaseEditorModel<{[key:string]:any}, RecordSchemaType, BaseEditorModel<RecordSchemaType>, void> {
    render() {
        let recordType = this.props.field.typeParameters.typeParams as SchemaRecordType;
        let fields = recordType.fields;
        return (<>{
            fields.map(field =>
                <FieldEditor value={this.props.value[field.name]} field={field} context={createContext(field, this.props.context)}/>
            )}
        </>)
    }
}
````

## Input Editor
````javascript
@editorFor("numeric", InputBoxLabelContainer, { isDefault: true })
export class NumericEditor extends BaseEditor<Numeric, NumericTypeInfo, BaseEditorModel<Numeric>, void> {
    render() {
        return (
            <input type="number"
                   id={this.uniqueId()}
                   value={this.value().toEditorString()}
                   required={this.field().required}
                   max={this.props.field.max || undefined}
                   min={this.props.field.min || undefined}
                   step={1}
                   onChange={this.notifyChanged}
            />
        );
    }
}
````

## Schema from TypeScript class
````javascript
@model
export class Field {
    @field("text", "Name", SchemaEntryType.entry, { required: true })
    name: string;

    @field("text", "Label", SchemaEntryType.entry, { required: true })
    label: string;
    
    @field("code", "Type", SchemaEntryType.selection, { required: true })
    typeName: string;

    @field("code", "Type", SchemaEntryType.selection, { required: true })
    entryType?: SchemaEntryType;

    @field("boolean", "Multiple", SchemaEntryType.entry, { required: true })
    multiple: boolean;

    @field("boolean", "Required", SchemaEntryType.entry, { required: true })
    required: boolean;

    @field("numeric", "Max Length", SchemaEntryType.entry, { required: false })
    maxLength?: Maybe<number>;

    @field("numeric", "Max", SchemaEntryType.entry, { required: false })
    max?: Maybe<number>;

    @field("numeric", "Min", SchemaEntryType.entry, { required: false })
    min?: Maybe<number>;

    @field("boolean", "Can Add", SchemaEntryType.entry, { required: false })
    canAdd?: boolean;

    @field("boolean", "Can Add", SchemaEntryType.entry, { required: false })
    canEditSelection?: boolean;

    @field("text", "UI Preference", SchemaEntryType.entry, { required: false })
    uiControlPreference?: string;
}
````
