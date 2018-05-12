import {getValidationMessages} from "../src/services/Validation";
import {fieldSchema} from "./TestUtils";
import {addUniqueIdsToChildren} from "../src/services/IdGeneratorService";
import {getFormSchemaFromJsonObject, addTypeToField} from "../src/services/SchemaFromJsonService";
import {exampleSchema} from "./TestSchema";

describe('getValidationMessages', () => {
    it('should get validation messages for max length', () => {
        let textField = addTypeToField(fieldSchema("textField", "Text Field", "text", { maxLength: 5, required: true }), exampleSchema);
        let text = "123456";
        let validations = getValidationMessages(textField, text);
        expect(validations).toHaveLength(1);
        expect(validations[0].message).toBe("Text Field must be shorter than 5 characters")
    })
    it('should get validation messages for required', () => {
        let textField = addTypeToField(fieldSchema("textField", "Text Field", "text", { maxLength: 5, required: true }), exampleSchema);
        let text = "";
        let validations = getValidationMessages(textField, text);
        expect(validations).toHaveLength(1);
        expect(validations[0].message).toBe("Text Field is required")
    })
})