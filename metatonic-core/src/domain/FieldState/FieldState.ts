

export type FieldState = {
    validationMessages: string[];
    children: { [property: string]: FieldState; [property: number]: FieldState };
}