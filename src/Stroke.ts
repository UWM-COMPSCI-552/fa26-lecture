import { Point } from './Point.js';
import { writeFile } from 'node:fs/promises';

/**
 * A mutable class representing a sequence of points in a color.
 */
export class Stroke {
    private static allStrokes : Array<Stroke> = [];
    private color : string;
    private points : Array<Point> = [];

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

    public add(p : Point) : void {
        this.points.push(p);
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