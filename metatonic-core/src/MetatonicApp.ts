import {Store} from "redux";
import {EditorResolver} from "./services/EditorResolver";
import {FormState} from "./domain/StateManagementTypes";
import {MetatonicResources} from "./domain/MetatonicResources";
import {AppDispatcher} from "./domain/contracts/AppDispatcher";
import {startNewFormStateManager} from "./state/ReduxStateManager";
import {FormBaseProperties, FormProperties} from "./domain/EditorModels/FormProperties";
import {copyAndSet} from "./extensions/functional";
import {PersistantDataStore} from "./state/PersistantDataStore";

export function createMetatonicApp(appStore: Store<any>, appDispatcher: AppDispatcher, editorResolver: EditorResolver<any, any, any>, dataStore: PersistantDataStore) {
    function createFormResources() {
        let stateManager = startNewFormStateManager(dataStore);
        return {
            appStore,
            appDispatcher,
            editors: editorResolver,
            formDispatcher: stateManager,
            formStore: stateManager.store
        } as MetatonicResources;
    }
    function createFormParameters(props: FormBaseProperties) {
        return Object.assign({}, props, {
            resources: createFormResources()
        }) as FormProperties
    }
    return { createFormResources, createFormParameters };
}