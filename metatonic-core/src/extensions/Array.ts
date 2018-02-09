import {BreakException} from "../CoreTypes";

export function insertAt<T>(array:T[], index: number, item:T) {
	let newArray = [...array];
	newArray.splice(index, 0, item);
	return newArray;
}
export function removeAt<T>(array: T[], index: number) {
	let newArray = [...array];
	newArray.splice(index, 1);
	return newArray;
}

export function forEachWithBreak<T>(array: T[], callback: (value: T, index: number, array: T[]) => void) {
	try {
		array.forEach(callback);
	} catch (BreakException) {}
}