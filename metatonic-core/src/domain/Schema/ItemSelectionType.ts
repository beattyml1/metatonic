import {TextTypeParameters} from "./TextTypes";

export type ItemSelectionType<T>  = (HasItemList<T> | HasItemTextSearchUrl) & {
    items?: T[];
    itemSearchUrl?: string;
    itemAdvancedSearchUrl?: string;
    canAdd: boolean;
};

export type HasItemList<T> = { items: T[] };
export type HasItemTextSearchUrl = { itemTextSearchUrl: string };
export type HasItemAdvancedSearchUrl = { itemAdvancedSearchUrl: string };

export type CodeDescriptionItem = { code: string; description?: string; };
export type CodeDescriptionSelectionType = ItemSelectionType<CodeDescriptionItem> & {
    showCode: boolean;
    showDescription: boolean;
    codeType: TextTypeParameters;
}