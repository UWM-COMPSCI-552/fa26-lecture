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

    test('test fourth constructor', () => {
        const p = new Point("1,2",3);
        expect(p.getX()).toBe(1);
        expect(p.getY()).toBe(2);
    });

    test('equals self', () => {
        const p = new Point(3,4);
        expect(p.equals(p)).toBe(true);
    });

    test('equals to same', () => {
        const p1 = new Point(3,4);
        const p2 = new Point(3,4);
        expect(p1.equals(p2)).toBe(true);
    })

    test('equals to equivalent', () => {
        const p1 = new Point(3,4);
        const p2 = new Point(3.0,4.0);
        expect(p1.equals(p2)).toBe(true);
    });

    test('can use equals', () => {
        const p1 = new Point(3,4);
        const p2 = new Point(3.0,4.0);
        const a = [p1];
        expect(a).toEqual([p2]); // deep equal, not "equals"
    });

    test('can compare with object', () => {
        const p1 = new Point(2,3);
        class FakePoint {
            private x = 2;
            private y = 3;
            public getX() { return 2; }
            public getY() { return 3; }
            public equals(p : FakePoint) { return false; }
        }
        const p2 = new FakePoint();
        expect(p1.equals(p2)).toBe(true);
    });
    describe('JSON tests', () => {
        test('empty object', () => {
            expect(() => Point.fromJSON({})).toThrow();
        });
    })
});