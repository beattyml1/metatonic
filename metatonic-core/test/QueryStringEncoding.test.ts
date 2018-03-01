import * as QueryString from '../src/services/QueryStringEncoding'
import {encode} from "../src/services/QueryStringEncoding";

describe('encode', () => {
    it('should handle no params', () => {
        let queryString = encode({});
        expect(queryString).toBe("")
    })
    it('should handle single full string param', () => {
        let queryString = encode({a:'aa'});
        expect(queryString).toBe("a=aa");
    })
    it('should handle multiple full string params', () => {
        let queryString = encode({a:'aa', b:'bb'});
        expect(queryString).toBe("a=aa&b=bb");
    })
    it('should handle first param empty second full', () => {
        let queryString = encode({a:'', b:'bb'});
        expect(queryString).toBe("a=&b=bb");
    })
    it('should handle first param null second full', () => {
        let queryString = encode({a:null, b:'bb'});
        expect(queryString).toBe("a=&b=bb");
    })

    it('should handle an array', () => {
        let queryString = encode({a:['00', '11']});
        expect(queryString).toBe("a=00&a=11");
    })
})