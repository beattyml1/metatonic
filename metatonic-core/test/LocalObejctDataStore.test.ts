import {ObjectDataStorage} from '../src/state/LocalStorageDataStore';

describe('records', () => {
    it('should do the things', async () => {
        let store = new ObjectDataStorage({ records: {houses:{}, persons:{}, addresses: {}}});
        let houses = store.records<{id, a}>('houses');
        await houses.create({
            id: 1,
            a:'b'
        });
        await houses.create({
            id: 2,
            a:'c'
        })

        let all = await houses.getAll();
        expect(all).toHaveLength(2)

        let x = await houses.getOne(2);
        expect(x.a).toBe('c');

        await houses.update({
            id: 2,
            a: 'd'
        })

        x = await houses.getOne(2);
        expect(x.a).toBe('d');

        await houses.delete(2);

        x = await houses.getOne(2);
        expect(x).toBeFalsy()

        all = await houses.getAll();
        expect(all).toHaveLength(1)
    })
})