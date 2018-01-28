import {Maybe} from 'CoreTypes';
export function hasValue(value): value is {} {
	return isKnown(value) && value !== "";
}

export function isKnown(value): value is {} {
	return value !== null && value !== undefined;
}

export function hasNonWhiteSpaceValue(value: Maybe<string>): value is string  {
	return isKnown(value) && value.trim() !== "";
}

export function ifHasValue<T, TThen, TElse>(value:Maybe<T>) {
	let _hasValue = hasValue(value);
	return {
		then(thenBlock: (x: T) => TThen) {
			let thenResult;
			if (_hasValue) {
				 thenResult = thenBlock(value!);
			}
			return { 
				else (elseBlock: (x: Maybe<T>) => TElse): TThen|TElse {
					if (!_hasValue) {
						return elseBlock(value) as TElse;
					}
					return thenResult as TThen;
				}
			}
		}
	}
}