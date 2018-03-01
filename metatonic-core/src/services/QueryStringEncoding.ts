import {hasValue} from "../extensions/hasValue";
import {isNumeric} from "../extensions/Number";

export function encode(obj, prefix?) {
    let str = new Array<any>(), prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            let key = getQueryStringKeyForObjectProp(prefix, prop);
            let val = obj[prop];
            str.push(isObject(val) ? encode(val, key) : encodeQueryStringParam(key, val));
        }
    }
    return str.join("&");
}

function formatValue(value) {
    return hasValue(value) ? value as any : ''
}

function isObject(val: any) {
    return val !== null && typeof val === "object";
}

function getQueryStringKeyForObjectProp(prefix, prop) {
    return prefix ?
        isNumeric(prop) ? arrayEncode(prefix, prop) : objectEncode(prefix, prop)
        : prop;
}

function objectEncode(prefix, prop) {
    return prefix + "[" + prop + "]";
}

function arrayEncode(prefix, prop) {
    return prefix;
}

function encodeQueryStringParam(key: string, value: any) {
    return `${encodeURIComponent(key)}=${encodeURIComponent(formatValue(value))}`;
}