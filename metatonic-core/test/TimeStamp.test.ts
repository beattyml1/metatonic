import {valueTypeTests} from './BaseDataTypeTests'
import {TimeStamp} from "../src";
import {SchemaField} from "../src/domain/Schema/Records";
import {ValueDataType} from "../src/Data/BaseDataTypes";

declare var require;
declare var it;
declare var expect;

valueTypeTests(TimeStamp, "2011-07-07T13:14:15+01:00", "01/02/2011 13:14:15");
