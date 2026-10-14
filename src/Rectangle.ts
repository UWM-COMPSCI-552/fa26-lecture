import { Point } from './Point.js';
import { AbstractShape, Delta } from './Shape.js';

abstract class CenteredShape extends AbstractShape {

    protected center : Point;
    protected color : string;

    constructor (center : Point, color : string) {
        super();
        this.center = center;
        this.color = color;
    }

    public setCenter (c:Point) {
        this.center = c;
    }
}
export class Rectangle extends CenteredShape {
    private width : number;
    private height : number;

    constructor (center : Point, width : number, height : number, color : string) {
        super(center, color);
        this.width = width;
        this.height = height;
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