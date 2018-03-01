import {valueTypeTests} from './BaseDataTypeTests'
import {Float} from "../src";

declare var require;
declare var it;
declare var expect;

valueTypeTests(Float, "34.4445", "34.4445", "34.4445", "34.4447");