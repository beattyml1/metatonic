import {AppDispatcher} from "./domain/contracts/AppDispatcher";
import {ComponentRegistry} from "./services/EditorRegistry";
import {PersistentDataStore} from "./state/PersistentDataStore";
import {MetatonicResources} from "./domain/MetatonicResources";
import {FormState} from "./domain/StateManagementTypes";
import {MetatonicFormEventDispatcher} from "./domain/contracts/MetatonicFormEventDispatcher";
import {FormAsyncMethods} from "./state/FormAsyncMethods";

export type MetatonicGlobalState = {
    forms: { [key:string]: FormState}
}

export interface MetatonicApp {
    appStore?: { getState: () => any},
    appDispatcher?: AppDispatcher
    contexts: { [key:string]:MetatonicContext }
}

export interface MetatonicContext {
    app: MetatonicApp,
    componentRegistry: ComponentRegistry,
    dataStore: PersistentDataStore,
    asyncMethods: FormAsyncMethods;
}

