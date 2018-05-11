
export interface ComponentContext {
    name?: string;
    repeaterIndex?: number;
    parentContext?: ComponentContext;
    fieldLocator: string;
}