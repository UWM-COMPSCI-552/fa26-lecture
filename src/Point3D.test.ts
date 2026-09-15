import { Point } from './Point.js';
import { Point3D } from './Point3D.js';

describe('Point3D tests', () => {
    describe('constructor tests', () => {
        test('string constructor', () => {
            const p = new Point3D("1,2,3");
            expect(p.getZ()).toBe(3);
        });
    })
    describe('equality test', () => {
        test('simple equality', () => {
            const p1 = new Point3D("1,2,3");
            const p2 = new Point3D(1,2,3);
            expect(p1.equals(p2)).toBe(true);
        });
        test('inequality', () => {
            const p1 = new Point3D(1,2,3);
            const p2 = new Point3D(1,2,4);
            expect(p1.equals(p2)).toBe(false);
        });
        test('Java problem', () => {
            const p1 = new Point3D(1,2,3) as Point;
            const p2 = new Point(1,2);
            expect(p2.equals(p1)).toBe(true);
            expect(p1.equals(p2)).toBe(false);
        })
    })
})