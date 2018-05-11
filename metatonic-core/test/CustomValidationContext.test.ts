import {newValidationContext} from "../src/services/CustomValidations";
import {ValidationTime} from "../src/domain/Schema/SchemaValidation";

describe('CustomValidationsContext', () => {
    it('should handle structured data', () => {
        let context = newValidationContext();
        context.register({name: "abc", validate: () => ["a"]});
        context.register({name: "xyz", validate: () => ["x"]});

        let validation = context.getValidation("abc");
        expect(validation).toBeTruthy();
        expect(validation.name).toBe("abc");
        expect(typeof validation.validate).toBe("function");
        expect(validation.validate("", {} as any, {} as any, ValidationTime.Save)).toContain("a");
    });
    it('should handle a function as only argument to register', () => {
        let context = newValidationContext();
        context.register(function abc() { return ["a"]});
        context.register({name: "xyz", validate: () => ["x"]});

        let validation = context.getValidation("abc");
        expect(validation).toBeTruthy();
        expect(validation.name).toBe("abc");
        expect(typeof validation.validate).toBe("function");
        expect(validation.validate("", {} as any, {} as any, ValidationTime.Save)).toContain("a");
    });
})