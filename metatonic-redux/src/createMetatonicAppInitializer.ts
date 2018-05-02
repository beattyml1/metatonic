import {AllMetatonicEvents, FormState, MetatonicRootAction} from "metatonic-core";
import {PersistantDataStore} from "metatonic-core";
import {ComponentRegistry, defaultComponentRegistry} from "metatonic-core";
import {
    MetatonicAppConfig, MetatonicContextInitializer, MetatonicReduxApp,
    MetatonicReduxContext
} from "./MetatonicReduxApp.interfaces";
import {FormEvents, MetatonicAction} from "metatonic-core";
import {FormProperties} from "metatonic-core";
import {getEditorResolverContext} from "metatonic-core";
import {MetatonicReduxAppInstance} from "./MetatonicReduxAppInstance";
import {Map} from "./PrivateTypes";

export function createMetatonicAppInitializer(config: MetatonicAppConfig){
    let o = config;
    let hasDefaultContext = o.dataStore && o.componentRegistry;
    let getAllKeys = (...maps: any[]) => maps.filter(_=>_).reduce((keys, map) => new Set([...keys, Object.keys(map)]), new Set());
    let allKeys = getAllKeys(o.dataStores, o.contexts, o.componentRegistries, hasDefaultContext ? { default: {} } : {});
    let getContext = (key) =>
        o.contexts && o.contexts[key] || {
            componentRegistry: o.componentRegistries && o.componentRegistries[key] || o.componentRegistry,
            dataStore: o.dataStores && o.dataStores[key] || o.dataStore
        }
    let contexts = Array.from(allKeys.entries()).reduce((contexts, key) => Object.assign(getContext(key), contexts), {});
    return contexts;
}