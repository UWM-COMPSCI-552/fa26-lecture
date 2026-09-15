import { Point } from "./Point.js";

export class Point3D extends Point {
    private readonly z : number;

    constructor ()
    constructor (s:string)
    constructor (x : number, y : number, z : number)
    constructor (sx : string|number = 0, y : number = 0, z : number = 0) {
        if (typeof sx === "number") {
            super(sx,y);
            this.z = z;
        } else {
            const lc = sx.lastIndexOf(',');
            super(sx.substring(0,lc));
            this.z = Number.parseInt(sx.substring(lc+1));
        }
    }

    public getZ() {
        return this.z;
    }

    public override equals(p : Point3D) : boolean {
        return super.equals(p) && this.z === p.z;
    }

    public override toJSON() : {x:number, y :number, z:Number} {
        const j = super.toJSON();
        return {...j, z:this.z};
    }
}