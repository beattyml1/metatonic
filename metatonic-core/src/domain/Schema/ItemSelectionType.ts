import {TextTypeParameters} from "./TextTypes";

export enum ItemCollectionSize {
    Small,
    Medium,
    Large
}

export type ItemSelectionType<T>  = {
    items?: T&{ $value, $description }[];
    itemSearchUrl: string;
    canAdd: boolean;
    size: ItemCollectionSize
};

export type CodeDescriptionItem = { code: string; description?: string; };
export type CodeDescriptionSelectionType = ItemSelectionType<CodeDescriptionItem> & {
    showCode: boolean;
    showDescription: boolean;
    codeType: TextTypeParameters;
}