import {MetatonicReduxContext} from "../../metatonic-redux/src/MetatonicReduxApp.interfaces";
import {MetaForm} from "../../metatonic-react/src/MetaForm";
import {FormEvents} from "../../metatonic-core/src/domain/StateManagementTypes";
import {Store} from "redux";
import {connect} from 'react-redux';

let formCounter = 1;
export function createReactReduxFormInstance(context: MetatonicReduxContext, formId) {
    formId = formId;
    context.registerForm(formId)
    let form = context.form(formId)

    return connect(form.mapStateToProps, form.mapDispatchToProps)(MetaForm);
}

export function createAndLoadReactReduxFormForRecord(store: Store<any>, context: MetatonicReduxContext, recordName, recordId?) {
    let formId = `form-${recordName}-${formCounter++}`

    let formComponent = createReactReduxFormInstance(context, formId);
    store.dispatch({ type: FormEvents.initialize, payload: { recordName, recordId }, meta: { formId }});
    return [formComponent, formId];
}