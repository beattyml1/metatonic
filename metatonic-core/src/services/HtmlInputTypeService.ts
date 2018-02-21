import {TextTypeParameters, TextTypes} from "../domain/Schema/TextTypes";
import {HtmlInputType, HtmlInputTypes} from "../domain/Html/HtmlInputType";
import {DateTimeTypes} from "../domain/Schema/DateTimeType";


export function getDateHtmlInputType(x: DateTimeTypes): HtmlInputType {
    switch (x){
        case DateTimeTypes.Date: return "date";
        case DateTimeTypes.DateTime: return "datetime-local";
        case DateTimeTypes.TimeStamp: return "datetime-local";
        case DateTimeTypes.Month: return "month";
        case DateTimeTypes.Time: return "time";
        default: throw "Invalid DateTimeTypes value";
    }
}

export function getTextHtmlInputType(type: TextTypes): HtmlInputType {
    if (HtmlInputTypes.includes(type as string)) {
        return type as HtmlInputType;
    } else return "text";
}