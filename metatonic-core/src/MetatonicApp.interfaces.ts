import {AppDispatcher} from "./domain/contracts/AppDispatcher";
import {ComponentRegistry} from "./services/EditorRegistry";
import {PersistantDataStore} from "./state/PersistantDataStore";
import {MetatonicResources} from "./domain/MetatonicResources";
import {FormState} from "./domain/StateManagementTypes";
import {MetatonicFormEventDispatcher} from "./domain/contracts/MetatonicFormEventDispatcher";

export type MetatonicGlobalState = {
    forms: { [key:string]: { state: FormState, context: MetatonicContext,  }}
}

export interface MetatonicApp {
    appStore?: { getState: () => any},
    appDispatcher?: AppDispatcher
    contexts: { [key:string]:MetatonicContext }
}

export interface MetatonicContext {
    app: MetatonicApp,
    componentRegistry: ComponentRegistry,
    dataStore: PersistantDataStore,
}

