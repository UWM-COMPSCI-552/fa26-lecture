import { Point } from './Point.js';
import { AbstractShape, Delta } from './Shape.js';

abstract class CenteredShape extends AbstractShape {

    protected center : Point;

    constructor (center : Point) {
        super();
        this.center = center;
    }

    public setCenter (c:Point) {
        this.center = c;
    }
}
export class Rectangle extends CenteredShape {
    private width : number;
    private height : number;
    private color : string;

    constructor (center : Point, width : number, height : number, color : string) {
        super(center);
        this.width = width;
        this.height = height;
        this.color = color;
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
        ctx.strokeStyle = this.color;
        const upperLeftX = this.center.getX() - this.width/2;
        const upperLeftY = this.center.getY() - this.height/2;
        ctx.strokeRect(upperLeftX,upperLeftY,this.width,this.height)
    }

    move(delta: Delta): void {
        throw new Error('Method not implemented.');
    }

}