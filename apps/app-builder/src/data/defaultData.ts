import {Field} from "../models/FieldModel";
import {Record} from "../models/RecordModel";

export let defaultStyles =
    `.app-preview-section label {
                    
},
.app-preview-section input {
    
}

.edit-Address .city-field.contain-text,
.edit-Address .state-field.contain-text,
.edit-Address .zip-field.contain-text{
  display: inline-block;
  margin-right: 10px;
}`
export let defaultAddress = {
    ...new Record(),
    fields: [
        {...new Field(), name: 'address1', label: 'Address 1'},
        {...new Field(), name: 'address2', label: 'Address 2'},
        {...new Field(), name: 'city', label: 'City'},
        {...new Field(), name: 'state', label: 'State', maxLength: 2},
        {...new Field(), name: 'zip', label: 'Zip', maxLength: 5},
    ],
    name: 'Address',
    label: 'Address'
}
export let defaultPerson = {
    ...new Record(),
    fields: [
        {...new Field(), name: 'fullName', label: 'Full Name'},
        {...new Field(), name: 'address', label: 'Address', typeName: 'Address'},
    ],
    name: 'Person',
    label: 'Person'
}