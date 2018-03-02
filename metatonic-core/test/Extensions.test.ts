import {transfrom} from "../src/extensions/functional";
import {hasValue} from "../src/extensions/hasValue";
import {isNumeric} from "../src/extensions/Number";

describe('transform', () => {
    it('should be able to pipe data through to transfromers', () => {
        let result = transfrom({a:'a'}).with(v => Object.assign({b:'b'}, v)).with(v => Object.assign({}, v, {a:v.a+'c'})).value();
        expect(result).toMatchObject({a:'ac',b:'b'});
    })
})

describe('hasValue', () => {
    it('should return true for a full string', () => {
        expect(hasValue("asf")).toBe(true);
    })
    it('should return false for a empty string', () => {
        expect(hasValue("")).toBe(false);
    })
    it('should return false for a null', () => {
        expect(hasValue(null)).toBe(false);
    })
    it('should return false for undefined', () => {
        expect(hasValue(undefined)).toBe(false);
    })
    it('should return true for 0', () => {
        expect(hasValue(0)).toBe(true);
    })
})

describe('isNumeric', () => {
    it('should return true for "1"', () => {
        expect(isNumeric("1")).toBe(true)
    })
    it('should return true for 1', () => {
        expect(isNumeric(1)).toBe(true)
    })
    it('should return false for "a"', () => {
        expect(isNumeric("a")).toBe(false)
    })
    it('should return false for null', () => {
        expect(isNumeric(null)).toBe(false)
    })
    it('should return false for ""', () => {
        expect(isNumeric("")).toBe(false)
    })
})