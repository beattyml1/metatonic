

export type FieldState = {
    validationMessages: string[];
    children: { [property: string]: FieldState };
}