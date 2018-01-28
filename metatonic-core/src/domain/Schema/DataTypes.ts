import {TextTypes} from "./TextTypes";
import {DateTimeTypes} from "./DateTimeType";
import {SchemaTypeCategory} from "./SchemaEnums";

export type DataTypes = TextTypes | DateTimeTypes | "quantity" | "record" | "code";