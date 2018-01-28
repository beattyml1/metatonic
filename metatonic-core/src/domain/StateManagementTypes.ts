
export enum StateEvents {
    propertyChanged,
    propertiesChanged,
    formServerUpdate,
    trySubmit,
    fullReload
}

export type FormEvent<TData, TLocator> = { event: StateEvents; data: TData, locator: TLocator };

export type FormState = {
    formData: any;
    serverDocumentData: any;
    schema: FormSchema;
    formState: FieldState;
    navigator: FormNavigator;
}