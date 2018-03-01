import {valueTypeTests} from './BaseDataTypeTests'
import {Date} from "../src";

declare var require;
declare var it;
declare var expect;

valueTypeTests(Date, "2011-07-07", "01/02/2011", "2011-07-07", "2011-07-08");