import {FormSchema, FormEvents} from "../domain"
import {Nullable} from "../CoreTypes"
import {MetatonicFormEventDispatcher} from "../domain/contracts/MetatonicFormEventDispatcher";
import {MetatonicResources} from "../domain/MetatonicResources";
import {MetatonicAction} from "../domain/StateManagementTypes";

export class FormUserEvents implements MetatonicFormEventDispatcher{
    constructor(public store: {dispatch(event: MetatonicAction)}) {

    }

    propertyChanged(payload: { propertySelector: string, value }){
        this.store.dispatch({type: FormEvents.propertyChanged, payload} as any)
    }

    itemAdded(payload: { propertySelector: string, item, index?: Nullable<number> }) {
        this.store.dispatch({type: FormEvents.itemAdded, payload} as any)
    }

    itemRemoved(payload: { propertySelector: string, index: number }) {
        this.store.dispatch({type: FormEvents.itemRemoved, payload} as any)
    }

    propertiesChanged(payload: { properties: { property: string, value: any }[] }) {
        this.store.dispatch({type: FormEvents.propertiesChanged, payload} as any)
    }

    localUpdate(payload: { formData: any }) {
        this.store.dispatch({type: FormEvents.formServerDataUpdate, payload } as any)
    }

    localReload(payload: { schema: FormSchema, formData?: any, resources: MetatonicResources }) {
        this.store.dispatch({type: FormEvents.fullReload, payload } as any)
    }
    trySubmit(payload?: { }) {

    }
}
