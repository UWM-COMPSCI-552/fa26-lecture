export class Point {

    private x : number;
    private y : number;

    constructor() 
    constructor(s : string)
    constructor(x : number, y : number)
    constructor(x : number|string = 0, y : number = 0) {
        if (typeof x === 'number') {
            this.x = x;
            this.y = y;
        } else {
            const comma = x.indexOf(',');
            this.x = Number.parseInt(x.substring(0,comma));
            this.y = Number.parseInt(x.substring(comma+1));
        }
    }

    public getX() : number {
        return this.x;
    }

    public getY() : number {
        return this.y;
    }

    public equals(other : Point) : boolean {
        return this.x === other.x && this.y === other.y;
    }

    public static fromJSON(json : unknown) : Point {
        if (typeof json === "object" && json != null) {
            if ("x" in json && "y" in json) {
                if (typeof json.x === "number" && typeof json.y === "number") {
                    return new Point(json.x,json.y);
                }
            }
        }
        throw new Error("bad JSON for point: " + json);
    }
}