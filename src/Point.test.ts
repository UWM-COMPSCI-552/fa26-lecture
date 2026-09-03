import { Point } from './Point.js';

describe('Point tests', () => {
    test('constructor empty', () => {
        const p = new Point();
        expect(p.getX()).toBe(0);
        expect(p.getY()).toBe(0);
    });
    test('string constructor', () => {
        const p = new Point("1,2");
        expect(p.getX()).toBe(1);
        expect(p.getY()).toBe(2);
    });
    // Quiz Solution:
    test('regular constructor', () => {
        const p = new Point(-3, 5.8);
        expect(p.getX()).toBe(-3);
        expect(p.getY()).toBe(5.8);
    });
})