 export function makeRequest(method, url, data?) {
    return new Promise<any>(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(data === undefined ? undefined : JSON.stringify(data));
    });
}
