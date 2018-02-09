export type Nothing = null | undefined | void
export type Maybe<T> = Nothing | T;
export type Nullable<T> = null | T;
export class BreakException {}

export type OptionalProps<T> = {
    [k in keyof T]?: T[k];
}