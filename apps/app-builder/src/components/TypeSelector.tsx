import * as React from 'react';
import {Field} from "../models/FieldModel";
import {Record} from "../models/RecordModel";
import {BaseSchema} from '../BuiltInTypes'
import {SchemaType,SchemaTypeCategory} from "metatonic-core";


export function TypeSelector(props: { field: Field, records: Record[], onChange, includeValues }) {
    let getCatName = (cat: SchemaTypeCategory) => {
        switch (cat){
            case SchemaTypeCategory.Boolean: return 'Boolean';
            case SchemaTypeCategory.Numeric: return 'Numeric';
            case SchemaTypeCategory.Quantity: return 'Quantity';
            case SchemaTypeCategory.DateTime: return 'DateTime';
            case SchemaTypeCategory.Text: return 'Text';
            default: return ''
        }
    }
    let catForType = (typeName) => {
        let baseType = baseTypes.find(x => x.name == typeName);
        let recordType  = props.records.find(x => x.name == typeName);
        return (baseType||recordType).category;
    }
    let baseTypes = Object.keys(BaseSchema).filter(_=>props.includeValues).map(name => BaseSchema[name]).filter(x=>x.category !== SchemaTypeCategory.Record);
    let categories = baseTypes.reduce((categories, type) =>  {
        let category = categories.find(cat => cat.category === type.category);
        if (category) category.types.push(type)
        else categories.push({ category: type.category, catName:getCatName(type.category),  types: [type] })
        return categories
    }, [] as { types: SchemaType[], category: string }[])
    return <select value={props.field.typeName} onChange={e => props.onChange(e, catForType(e.target.value)) } >
        <option selected={true} disabled={true} value={""}>Choose One</option>
        <optgroup label="Records">
            {props.records.map(x =>
                <option value={x.name} data-category="1">{x.label||x.name}</option>)}
        </optgroup>
        {categories.map(category =>
           <optgroup label={category.catName}>
               {category.types.map(type =>
                   <option value={type.name} data-category={category.category}>{type.label||type.name}</option>)}
           </optgroup>
        )}
    </select>
}