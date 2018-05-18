

export type DateTimeBaseParams = {
    min?: string;
    max?: string;
}

export type DateTimeTypeBase = DateTimeBaseParams & { date?: boolean, time?: boolean, month?: boolean }

export type TimeTypeParams = {
    hasSeconds?: boolean;
    includesUserTimezone?: boolean;
}

export type DateTypeParams = {

}

export type MonthTypeParams = {

}

export type TimeType = TimeTypeParams & DateTimeBaseParams;
export type DateType = DateTypeParams & DateTimeBaseParams;
export type MonthType = MonthTypeParams & DateTimeBaseParams;
export type DateTimeType = DateType & TimeType;
export enum DateTimeTypes { Date = "date", Time = "time", DateTime = "datetime", Month = "month", TimeStamp = "timestamp" };


export type DateTimeTypeData = {
    type: DateTimeTypes;
    params: TimeType|DateType|MonthType|DateTimeType;
};