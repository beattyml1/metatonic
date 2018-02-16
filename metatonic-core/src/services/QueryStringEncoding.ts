
export function encode(obj, prefix?) {
    let str = new Array<any>(), prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            let key = this.getQueryStringKeyForObjectProp(prefix, prop);
            let val = obj[prop];
            let isObject = this.isObject(val)
            str.push(isObject ? this.encodeQueryString(val, key) : this.encodeQueryStringParam(key, val));
        }
    }
    return str.join("&");
}

function isObject(val: any) {
    return val !== null && typeof val === "object";
}

function getQueryStringKeyForObjectProp(prefix, prop) {
    return prefix ? prefix + "[" + prop + "]" : prop;
}

function encodeQueryStringParam(key: string, value: any) {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}
