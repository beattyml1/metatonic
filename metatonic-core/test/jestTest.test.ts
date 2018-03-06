/// <reference path="../node_modules/@types/jest/index.d.ts" />
declare var require;

it('test', () => {
    const x = require('../src/');
    expect(x).toBeTruthy()
});