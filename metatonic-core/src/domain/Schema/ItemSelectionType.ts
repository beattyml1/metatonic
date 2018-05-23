import {TextTypeParameters} from "./TextTypes";

export enum ItemCollectionSize {
    Small,
    Medium,
    Large
}

export interface ItemSelectionType<T> {
    items?: T&{ $value, $description }[];
    group?: string;
    params?: any;
    url?: string;
    canAdd: boolean;
    size: ItemCollectionSize;
    codeName: string;
    descriptionName: string;
    shouldShowCodeAndDescription: boolean;
};

export type CodeDescriptionItem = { code: string; description?: string; };
export type CodeDescriptionSelectionType = ItemSelectionType<CodeDescriptionItem> & {
    showCode: boolean;
    showDescription: boolean;
    codeType: TextTypeParameters;
}