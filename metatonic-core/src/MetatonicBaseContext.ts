import {MetatonicApp, MetatonicContext} from "./MetatonicApp.interfaces";
import {ComponentRegistry} from "./services/EditorRegistry";
import {PersistentDataStore} from "./state/PersistentDataStore";
import {FormAsyncMethods} from "./state/FormAsyncMethods";

export class MetatonicBaseContext implements MetatonicContext {
    constructor(public app: MetatonicApp, public componentRegistry: ComponentRegistry, public dataStore: PersistentDataStore) {

    }
    asyncMethods = new FormAsyncMethods(this);
}