# metatonic-platform
[![Build Status](https://travis-ci.org/beattyml1/metatonic.svg?branch=master)](https://travis-ci.org/beattyml1/metatonic)
[![Maintainability](https://api.codeclimate.com/v1/badges/5b37844e034f88e365dc/maintainability)](https://codeclimate.com/github/beattyml1/metatonic-platform/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5b37844e034f88e365dc/test_coverage)](https://codeclimate.com/github/beattyml1/metatonic-platform/test_coverage)

|Name| metatonic-core | metatonic-react | cli | app-builder | example |
|:---|:--------------:|:----------------|:----|:------------|:--------|
|NPM| [![core:npm version](https://badge.fury.io/js/metatonic-core.svg)](https://badge.fury.io/js/metatonic-core) | [![react:npm version](https://badge.fury.io/js/metatonic-react.svg)](https://badge.fury.io/js/metatonic-react) | Package: N/A | Package: N/A | Package: N/A |
|Statement Coverage| 96% | 46% | N/A | N/A | N/A |

The N/A items above are still in early stage development. Test coverage for the parts of metatonic-react that have been written is the current number one priority, followed by finishing that module and fleshing out examples and documentation. 

Everything is still a work in progress. I'd love your help as long as your down with the [Code of Conduct](CodeOfConduct.md)

Some things we do and don't care about
* We care about helping you write least code possible, hopefully no code sometimes
* We care deeply about data entry. Good data is the backbone of so many jobs that matter.
* We care about you being to create what ever you want. We provide a way to make creating data entry and display parts of your app very quickly. We believe in Configuration and convention.
* We care about you being to write in the UI framework of your choice. Right now we support React but it's coded to be able to have plugins later for Angular, Vue, Knockout whatever floats your boat. As long as it works well with one way bindings and state managment like redux you should be good.
* We care about the developer experience in TypeScript, we aren't terribly worried about plain old JavaScript. Types are central to MetaTonic and trying to worry about JS users would be counterproductive at this time.

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
