export type HtmlInputType =
    HtmlTextInputType | HtmlDateTimeInputType
    | "button"
    | "reset"
    | "submit"
    | "checkbox"
    | "radio"
    | "color"
    | "file"
    | "hidden"
    | "image"
    | "number"
    | "range"
    | "search"

export type HtmlTextInputType =
    | "password"
    | "email"
    | "tel"
    | "url"
    | "text";

export type HtmlDateTimeInputType =
    | "date"
    | "datetime-local"
    | "time"
    | "month"
    | "week";

export const HtmlTextInputTypes =
    [ "password"
    , "email"
    , "tel"
    , "url"
    , "text" ];

export const HtmlDateTimeInputTypes =
    [ "date"
    , "datetime-local"
    , "time"
    , "month"
    , "week" ];

export const HtmlInputTypes =
    [ "button"
    , "reset"
    , "submit"
    , "checkbox"
    , "radio"
    , "color"
    , "file"
    , "hidden"
    , "image"
    , "number"
    , "range"
    , "search"]
    .concat(HtmlTextInputTypes)
    .concat(HtmlDateTimeInputTypes);