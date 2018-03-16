import {getValidationMessages} from "../src/services/Validation";
import {fieldSchema} from "./TestUtils";

describe('getValidationMessages', () => {
    it('should get validation messages for max length', () => {
        let textField = fieldSchema("textField", "Text Field", "Text", { maxLength: 5, required: true })
        let text = "123456";
        let validations = getValidationMessages(textField, text);
        expect(validations).toHaveLength(1);
        expect(validations).toContain("Text Field must be shorter than 5 characters")
    })
    it('should get validation messages for required', () => {
        let textField = fieldSchema("textField", "Text Field", "Text", { maxLength: 5, required: true })
        let text = "";
        let validations = getValidationMessages(textField, text);
        expect(validations).toHaveLength(1);
        expect(validations).toContain("Text Field is required")
    })
})