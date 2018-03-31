import {MetatonicApp, MetatonicContext} from "./MetatonicApp.interfaces";
import {ComponentRegistry} from "./services/EditorRegistry";
import {PersistantDataStore} from "./state/PersistantDataStore";

export class MetatonicBaseContext implements MetatonicContext {
    constructor(public app: MetatonicApp, public componentRegistry: ComponentRegistry, public dataStore: PersistantDataStore) {

    }
}