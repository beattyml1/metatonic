import {Maybe} from '../CoreTypes';
export function hasValue(value): value is {} {
	return isKnown(value) && value !== "";
}

export function isKnown(value): value is {} {
	return value !== null && value !== undefined;
}

export function hasNonWhiteSpaceValue(value: Maybe<string>): value is string  {
	return isKnown(value) && value.trim() !== "";
}