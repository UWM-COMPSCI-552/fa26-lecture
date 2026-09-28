import { Point } from './Point.js';
import { Stroke } from './Stroke.js';

describe('Stroke Tests', () => {
    const p11 = new Point(1,1);
    const p22 = new Point(2,2);
    const p21 = new Point(2,1);
    describe('points tests', () => {
        test('count with iterator', () => {
            const s = new Stroke();
            s.add(p11);
            s.add(p22);
            s.add(p21);
            let c = 0;
            for (const p of s.points()) {
                ++c;
            }
            expect(c).toBe(3);
        });
        test('order of iteration', () => {
            const s = new Stroke();
            s.add(p11);
            s.add(p22);
            s.add(p21);
            const g = s.points();
            const r1 = g.next();
            expect(r1).toEqual({value:p11, done:false});
            const r2 = g.next();
            expect(r2).toEqual({value:p22, done:false});
            const r3 = g.next();
            expect(r3).toEqual({value:p21, done:false});
            const r4 = g.next();
            expect(r4).toEqual({done:true, value:0});
        });
        test('remove at beginning', () => {
            const s = new Stroke();
            s.add(p11);
            s.add(p22);
            s.add(p21);
            const g = s.points();
            const r1 = g.next(true);
            expect(r1).toEqual({value:p11, done:false});
            expect(s.size()).toBe(3);
        });
        test('remove first', () => {
            const s = new Stroke();
            s.add(p11);
            s.add(p22);
            s.add(p21);
            const g = s.points();
            const r1 = g.next();
            expect(r1).toEqual({value:p11, done:false});
            const r2 = g.next(true);
            expect(r2).toEqual({value: p22, done: false});
            expect(s.size()).toBe(2);
            const r3 = g.next(false);
            expect(r3).toEqual({value: p21, done: false});
            const r4 = g.next(false);
            expect(r4).toEqual({value: 1, done: true});
        });
    });
});