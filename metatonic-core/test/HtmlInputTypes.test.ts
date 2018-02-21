
import {getDateHtmlInputType, getTextHtmlInputType} from "../src/services/HtmlInputTypeService";
import {DateTimeTypes} from "../src/domain/Schema/DateTimeType";
import {HtmlInputType, HtmlInputTypes, HtmlTextInputTypes} from "../src/domain/Html/HtmlInputType";

declare let require;
declare let it, describe;
declare let expect;

describe('getDateHtmlInputType', () => {
    it('should return "date" for "date', () => {
        let result = getDateHtmlInputType(DateTimeTypes.Date);
        expect(result).toBe("date");
    })
    it('should return "time" for "time', () => {
        let result = getDateHtmlInputType(DateTimeTypes.Time);
        expect(result).toBe("time");
    })
    it('should return "datetime-local" for "datetime', () => {
        let result = getDateHtmlInputType(DateTimeTypes.DateTime);
        expect(result).toBe("datetime-local");
    })
    it('should return "datetime-local" for "timestamp', () => {
        let result = getDateHtmlInputType(DateTimeTypes.TimeStamp);
        expect(result).toBe("datetime-local");
    })
    it('should return "month" for "month', () => {
        let result = getDateHtmlInputType(DateTimeTypes.Month);
        expect(result).toBe("month");
    })
})

describe('getTextHtmlInputType', () => {
    HtmlTextInputTypes.map(type => {
        it('html built ins should return themselves', () => {
            let result = getTextHtmlInputType(type as any);
            expect(result).toBe(type)
        })
    })
    it('should return text for non HTML built ins', () => {
        let result = getTextHtmlInputType('abc' as any);
        expect(result).toBe('text')
    })
})