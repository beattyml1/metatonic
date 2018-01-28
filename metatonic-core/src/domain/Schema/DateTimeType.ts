type DateTimeBaseParams = {
    min?: string;
    max?: string;
}

type DateTimeTypeBase = DateTimeBaseParams & { date?: boolean, time?: boolean, month?: boolean }

type TimeTypeParams = {
    hasSeconds?: boolean;
    includesUserTimezone?: boolean;
}

type DateTypeParams = {

}

type MonthTypeParams = {

}

export type TimeType = TimeTypeParams & DateTimeBaseParams;
export type DateType = DateTypeParams & DateTimeBaseParams;
export type MonthType = MonthTypeParams & DateTimeBaseParams;
export type DateTimeType = DateType & TimeType;
export enum DateTimeTypes { Date = "date", Time = "time", DateTime = "datetime", Month = "month" };
type ParametrizedType<TParams, TType> = {
    type: TType;
    params: TParams;
}

export type DateTimeTypeData = ParametrizedType<TimeType, DateTimeTypes.Time> | ParametrizedType<DateType, DateTimeTypes.Date> |
                           ParametrizedType<DateTimeType, DateTimeTypes.DateTime> | ParametrizedType<MonthType, DateTimeTypes.Month>;