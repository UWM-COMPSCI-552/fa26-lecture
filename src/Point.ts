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
}