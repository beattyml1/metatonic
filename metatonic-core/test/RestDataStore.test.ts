import {RestDataStore} from "../src/state/RestDataStore";
import { RestClient} from "../src/services/Rest";
import Expect = jest.Expect;
import Matchers = jest.Matchers;

import * as Rest from "../src/services/Rest";

function fixAsyncErrors(action: (wrapExpect: (expectation: () => void|Promise<any>) => void) => Promise<any>|void) {
    let errors = new Array();
    action(expectation => {
        try {
            let result = expectation();
            if (result) return result.catch(e => errors.push(e));
        } catch (e) { errors.push(e); return Promise.resolve()}
    })
    return Promise.resolve(errors);
}

// let restMock = jest.genMockFromModule('../src/services/Rest') as {
//     Rest: RestClient|any;
// };

let dataStore = {
    houses: new Array<{id}|any>()
}

let restOriginal = Rest.Rest;
let restMock = Rest as any;



describe('RestDataStore', () => {
    beforeEach(() => {
        restMock.Rest = {};
        restMock.Rest.Get = (url, query) => {
            let urlParts = url.split('/');
            let hasId = urlParts.length === 2;
            let results = hasId ? dataStore.houses.find(x=>x.id===url[1]) : dataStore.houses;
            return Promise.resolve(results)
        }

        restMock.Rest.Post = (url, data) => {
            dataStore.houses.push(data);
            return Promise.resolve();
        }

        restMock.Rest.Put = (url, data) => {
            dataStore.houses.findIndex(x => x.id === data.id);
            return Promise.resolve();
        }

        restMock.Rest.Delete = (url, data) => {
            dataStore.houses.splice(dataStore.houses.findIndex(x => x.id === data.id), 1)
            return Promise.resolve();
        }
    });
    afterEach(() => restMock.Rest = restOriginal);

    it('should be able to crud', async () => {
        let errors = await fixAsyncErrors(async (wrapExpect) => {
            let ds = new RestDataStore('');
            let houses = ds.records<any>('houses');
            await wrapExpect(async () => expect(await houses.getAll()).toHaveLength(0));
            await houses.create({
                id: '1',
                address: '123 my place'
            });

            await wrapExpect(async () => expect(await houses.getAll()).toHaveLength(1));

            let house1 = await houses.getOne('1')

            wrapExpect(() => expect(house1).toBeTruthy());

            wrapExpect(async () => expect(await houses.getOne('0')).toBeFalsy());

            wrapExpect(() => expect(house1.address).toBe('123 my place'));

            await houses.create({
                id: '2',
                address: '123 your place'
            })

            await wrapExpect(async () => await expect(houses.getAll()).toHaveLength(2));

            await houses.update({
                id: '1',
                address: '123 my new place'
            })

            house1 = await houses.getOne('1');
            wrapExpect(() => expect(house1.address).toBe('123 my new place'));

            let house2 = await houses.getOne('2');
            expect(house2.address).toBe('123 your place');

            await houses.delete('1');

            await wrapExpect(async () => expect(await houses.getAll()).toHaveLength(1));

            house2 = await houses.getOne('2');

            wrapExpect(() => expect(house2).toBeTruthy());
            wrapExpect(() => expect(house2.address).toBe('123 your place'));
        }).catch(e => [e]);
        if (errors) {
            errors.forEach(console.error)
            errors.forEach(fail)
        };
    })
})