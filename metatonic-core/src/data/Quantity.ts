import {Decimal} from "./Decimal";

export class Quantity {
    value: Decimal;
    decimalMultiplier: number;
    unit?: string;
}