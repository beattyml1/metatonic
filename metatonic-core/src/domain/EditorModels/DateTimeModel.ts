import {BaseEditorModel} from "./BaseEditorModel";
import {DateTime} from "../../data/DateTime";
import {TimeStamp} from "../../data/TimeStamp";
import {Date} from "../../data/Date";

export type DateTimeModel = BaseEditorModel<Date|DateTime|TimeStamp>;