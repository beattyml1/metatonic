import {Rest} from "../src/services/Rest";
import  mock from 'xhr-mock';

function fixAsyncErrors(action: (wrapExpect: (expectation: () => void) => void) => Promise<any>|void) {
    let errors = new Array();
    action(expectation => {
        try {expectation()} catch (e) {errors.push(e); }
    })
    return errors;
}

describe('makeRequest', () => {
    // replace the real XHR object with the mock XHR object before each test
    beforeEach(() => mock.setup());

    // put the real XHR object back and clear the mocks after each test
    afterEach(() => mock.teardown());

    it('should be able to post data', async () => {
        expect.assertions(3)
        let errors = fixAsyncErrors(wrapExpect => {
            mock.post('/test', (req, response) => {
                wrapExpect(() => expect(req.header('Content-Type')).toContain('application/json'));
                wrapExpect(() => expect(req.body()).toBe('{"x":"yy"}'));
                return response.status(200).body('{}')
            })
        });

        let x = await Rest.Post('/test', {x:'yy'})
        if (errors) errors.forEach(fail);
        expect(x).toBeTruthy();
    })
    it('should be able to get data with no query params', async () => {
        expect.assertions(4)
        let errors = fixAsyncErrors(wrapExpect => {
            mock.get('/test', (req, response) => {
                wrapExpect(() => expect(req.header('Content-Type')).toContain('application/json'));
                return response.status(200).body(JSON.stringify({a:'b'}))
            })
        });

        let x = await Rest.Get<{a}>('/test')
        if (errors) errors.forEach(fail);
        expect(x).toBeTruthy();
        expect(x).toHaveProperty('a');
        expect(x.a).toBe('b');
    })
    it('should be able to get data with query params', async () => {
        expect.assertions(4)
        let errors = fixAsyncErrors(wrapExpect => {
            mock.get('/test?x=y', (req, response) => {
                wrapExpect(() => expect(req.header('Content-Type')).toContain('application/json'));
                return response.status(200).body(JSON.stringify({a:'b'}))
            })
        });

        let x = await Rest.Get<{a}>('/test', {x:'y'})
        if (errors) errors.forEach(fail);
        expect(x).toBeTruthy();
        expect(x).toHaveProperty('a');
        expect(x.a).toBe('b');
    })
    it('should be able to put data', async () => {
        expect.assertions(3)
        let errors = fixAsyncErrors(wrapExpect => {
            mock.put('/test', (req, response) => {
                wrapExpect(() => expect(req.header('Content-Type')).toContain('application/json'));
                wrapExpect(() => expect(req.body()).toBe('{"x":"yy"}'));
                return response.status(200).body('{}')
            })
        });

        let x = await  Rest.Put('/test', {x:'yy'})
        if (errors) errors.forEach(fail);
        expect(x).toBeTruthy();
    })
    it('should be able to delete data', async () => {
        expect.assertions(2)
        let errors = fixAsyncErrors(wrapExpect => {
            mock.delete('/test', (req, response) => {
                wrapExpect(() => expect(req.header('Content-Type')).toContain('application/json'));
                return response.status(200).body('{}')
            })
        });

        let x = await  Rest.Delete('/test')
        if (errors) errors.forEach(fail);
        expect(x).toBeTruthy();
    })
})