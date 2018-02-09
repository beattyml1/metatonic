/// <reference path="../node_modules/@types/jest/index.d.ts" />
declare var require;

it('test', () => {
    const x = require('../services/index');
    expect(4).toBe(4);
});