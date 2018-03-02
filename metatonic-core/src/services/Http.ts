 export async function makeRequest(method, url, data?) {
    return new Promise<any>(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        let onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText,
                response: xhr.response
            })
        };

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response ? JSON.parse(xhr.response) : xhr.response);
            } else {
                onerror();
            }
        };
        xhr.onerror = onerror;
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(data === undefined ? undefined : JSON.stringify(data));
    });
}
