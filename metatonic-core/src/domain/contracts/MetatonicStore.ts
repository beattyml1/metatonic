import {FormState} from "../StateManagementTypes";

export interface StoreReads<T> {
    getState: () => T;
    subscribe(callback: () => void);
}
export interface MetatonicFormStore extends StoreReads<FormState> {

}