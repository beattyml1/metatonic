import {Rest} from "metatonic-core/src/index";

export function doCli(action: string, subject, ...args) {
    switch (action) {
        case "add": add(...args);
        case "init": init(...args);
        case "test": test(...args);
        case "run": run(...args);
    }
}

export function add(type: string, name: string, type?: string, ...args) {
    switch (type) {
        case "model": addModel(name);
        case "form": addForm(name, type);
        case "editor": addEditor(name, type);
        case "multiEdit": addMultiEdit(name, type);
        case "select": addSelect(name, type);
    }
}

export function init(name: string, schemaSource: string) {
    if (/https?:\/\/.*/g.test(schemaSource)) {
        var schemaSourceType = 'json-remote'
    } else {
        var schemaSourceType = /.*\.json/g.test(schemaSource) ? 'json-local' : /.*\.ts/g.test(schemaSource) ? 'file-local' : 'local';
    }
}

export function run() {

}

export function test() {

}

export function addModel(name) {

}

export function addForm(name, type) {

}

export function addEditor(name, type) {

}

export function addMultiEdit(name, type) {

}

export function addSelect(name, type) {

}