

import {SchemaElement} from "metatonic-core";

export function replace<T extends SchemaElement>(items: T[], item: T) {
    return items.map(i => i.id === item.id ? item : i)
}