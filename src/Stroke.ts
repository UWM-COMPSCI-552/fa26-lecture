import { Point } from './Point.js';
import { writeFile } from 'node:fs/promises';

/**
 * A mutable class representing a sequence of points in a color.
 */
export class Stroke {
    private static allStrokes : Array<Stroke> = [];
    private color : string;
    private pointsArray : Array<Point> = [];

    public static getAll() : Array<Stroke> {
        return this.allStrokes; // "this" is not a Stroke.  It is Stroke
    }

    /**
     * Create a stroke with a particular color,
     * which can be changed later.
     * @param color color for this stroke, default "black".
     */
    constructor(color : string = "black") {
        this.color = color;
        Stroke.allStrokes.push(this);
    }

    /** Return an array of rthe points of thie stroke */
    public getPoints() : Array<Point> {
        return [...this.pointsArray];
    }

    /*public points() : Iterable<Point>&Iterator<Point,undefined,unknown> {
        let currentIndex = -1;
        const result : Iterable<Point> & Iterator<Point,undefined,unknown> = {
            next : (b) => {
                ++currentIndex;
                if (currentIndex >= this.pointsArray.length) {
                    return { done: true }
                } else 
                return {
                    value : this.pointsArray[currentIndex],
                    done : false
                };
            },
            [Symbol.iterator] : () => {
                return result;
            },
        };
        return result;
    }*/

    public *points() : Generator<Point,undefined,undefined|boolean> {
        for (let i = 0; i < this.pointsArray.length; ++i) {
            if (yield this.pointsArray[i]) {
                // remove the value!
            }
        }
    }

    public add(p : Point) : void {
        this.pointsArray.push(p);
    }

    public setColor(color : string) : void {
        this.color = color;
    }

    /**
     * Get the color.
     * @returns color of this stroke
     */
    public getColor() : string {
        return this.color;
    }

    public async write(filename : string) {
        const s = JSON.stringify(this);
        try {
            await writeFile(filename, s, 'utf8');
            console.log("Done!");
            return "Success!";
        } catch (err) {
            return "Error: " + err;
        }
    }
}