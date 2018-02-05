import Navigo from 'navigo';
import {FormSchema} from "metatonic-core/src/index";

export class MetatonicRouter {
    constructor() {
        var root = null;
        var useHash = true; // Defaults to: false
        var hash = '#!'; // Defaults to: '#'
        var router = new Navigo(root, useHash, hash);
        router
            .on('/f/:formName', (params: { formName }) => { })
            .on('/f/:formName/:recordId', (params: { formName, recordId} ) => { })
            .on('/r/:recordType/:recordId', (params: { recordType, recordId} ) => { })
            .on('/r/:recordType/:recordId/display', (params: { recordType, recordId} ) => { })
            .on('/r/:recordType/list/:groupName', (params: { recordType, groupName}, query ) => { })
            .on('/r/:recordType/', (params: { recordType }, query ) => { })
            .on('/p/:pageName/', (params, query) => {

            });
    }

    displayForm(name: string, schema: FormSchema) {

    }
}