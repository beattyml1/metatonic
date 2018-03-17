import {BaseEditorModel} from "./BaseEditorModel";
import {DateTime} from "../../Data/DateTime";
import {TimeStamp} from "../../Data/TimeStamp";
import {Date} from "../../Data/Date";

export type DateTimeModel = BaseEditorModel<Date|DateTime|TimeStamp>;