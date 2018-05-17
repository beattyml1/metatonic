export type Nothing = null | undefined | void
export type Maybe<T> = Nothing | T;
export type Nullable<T> = null | T;
export class BreakException {}

export type OptionalProps<T> = {
    [k in keyof T]?: T[k];
}

type Overwrite<T1, T2> = {
    [P in Exclude<keyof T1, keyof T2>]: T1[P]
} & T2;

export type RequiredProps<T> = {
    [k in keyof T]: Defined<T>[k];
}

export type PossiblyUndefined<T> = T|undefined;
export type Defined<T> = T&{}
