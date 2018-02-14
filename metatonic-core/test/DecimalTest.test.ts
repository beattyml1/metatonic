import {valueTypeTests} from './BaseDataTypeTests'
import {Decimal} from "../src";

declare var require;
declare var it;
declare var expect;

valueTypeTests(Decimal, "34.45");