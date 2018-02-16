import {valueTypeTests} from './BaseDataTypeTests'
import {DateTime} from "../src";

declare var require;
declare var it;
declare var expect;

valueTypeTests(DateTime, "2011-07-07T13:14:15", "01/02/2011 13:14:15");