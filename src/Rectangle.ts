import { Point } from './Point.js';
import { AbstractShape, Delta } from './Shape.js';

export class Rectangle extends AbstractShape {
    private center : Point;
    private width : number;
    private height : number;

    constructor (center : Point, width : number, height : number) {
        super();
        this.center = center;
        this.width = width;
        this.height = height;
    }

    public setCenter (c:Point) {
        this.center = c;
    }
    public setWidth(w:number) {
        this.width = w;
    }
    public setHeight(h:number) {
        this.height = h;
    }
    
    setStroke(color: string): void {
        throw new Error('Method not implemented.');
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // ctx.stroke = "black";
        ctx.strokeRect(this.center.getX(),this.center.getY(),this.width,this.height)
    }

    move(delta: Delta): void {
        throw new Error('Method not implemented.');
    }

}