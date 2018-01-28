import {Decimal} from "./Decimal";
import {Integer} from "./Integer";
import {Float} from "./Float";
export * from './Float';
export * from './Integer';
export * from './Decimal';

export type Numeric = Decimal | Float | Integer;