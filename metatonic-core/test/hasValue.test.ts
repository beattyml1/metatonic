import { hasValue, hasNonWhiteSpaceValue, isKnown } from '../src/extensions/hasValue';

describe('hasValue', () => {
    it('should return false when null', () => {
        expect(hasValue(null)).toBe(false);
    })
    it('should return false when empty string', () => {
        expect(hasValue('')).toBe(false);
    })
    it('should return false when undefined', () => {
        expect(hasValue(undefined)).toBe(false);
    })
    it('should return true when space', () => {
        expect(hasValue(' ')).toBe(true);
    })
    it('should return true when 0', () => {
        expect(hasValue(0)).toBe(true);
    })
    it('should return true when []', () => {
        expect(hasValue([])).toBe(true);
    })
});
describe('hasNonWhiteSpaceValue', () => {
    it('should return false when null', () => {
        expect(hasNonWhiteSpaceValue(null)).toBe(false);
    })
    it('should return false when empty string', () => {
        expect(hasNonWhiteSpaceValue('')).toBe(false);
    })
    it('should return false when undefined', () => {
        expect(hasNonWhiteSpaceValue(undefined)).toBe(false);
    })
    it('should return false when space', () => {
        expect(hasNonWhiteSpaceValue(' ')).toBe(false);
    })

});
describe('isKnown', () => {
    it('should return false when null', () => {
        expect(isKnown(null)).toBe(false);
    })
    it('should return true when empty string', () => {
        expect(isKnown('')).toBe(true);
    })
    it('should return false when undefined', () => {
        expect(isKnown(undefined)).toBe(false);
    })
    it('should return true when space', () => {
        expect(isKnown(' ')).toBe(true);
    })
    it('should return true when 0', () => {
        expect(isKnown(0)).toBe(true);
    })
    it('should return true when []', () => {
        expect(isKnown([])).toBe(true);
    })

});