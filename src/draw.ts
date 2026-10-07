import { Shape } from './Shape.js';
import { Stroke } from './Stroke.js';
import { Point } from './Point.js';
import { Rectangle } from './Rectangle.js';

export interface Tool {
    down(p : Point) : void;
    drag(p : Point) : void;
    up(p : Point) : void
}

type Drawing = Array<Shape>;

class StrokeTool implements Tool {
    private str : Stroke = new Stroke();
    private drawing : Drawing;
    private ctx : CanvasRenderingContext2D;

    constructor(drawing : Drawing, ctx : CanvasRenderingContext2D) {
        this.drawing = drawing;
        this.ctx = ctx;
    }

    down(p : Point) {
        this.str = new Stroke("black");
        this.str.add(p);
        this.drawing.push(this.str);
        this.ctx.beginPath();
        this.ctx.moveTo(p.getX(), p.getY());
    }

    drag(p : Point) {
        this.str.add(p);
        this.ctx.lineTo(p.getX(), p.getY());
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(p.getX(), p.getY());
    }

    up(p : Point) {
        // this.ctx.closePath();
        this.ctx.lineTo(p.getX(), p.getY());
        this.ctx.stroke();
    }
}

class RectangleTool implements Tool {
    private str : Rectangle = new Rectangle(new Point(0,0),0,0);
    private drawing : Drawing;
    private ctx : CanvasRenderingContext2D;
    private initial : Point = new Point(0,0);

    constructor(drawing : Drawing, ctx : CanvasRenderingContext2D) {
        this.drawing = drawing;
        this.ctx = ctx;
    }
    
    down(p : Point) {
        this.str = new Rectangle(p,0,0);
        this.drawing.push(this.str);
        this.str.draw(this.ctx);
        this.initial = p;
    }

    drag(p : Point) {
        this.str.setCenter(new Point((this.initial.getX()+p.getX())/2, (this.initial.getY()+p.getY())/2));
        this.str.setWidth(Math.abs(this.initial.getX()-p.getX()));
        this.str.setHeight(Math.abs(this.initial.getY() - p.getY()));
        this.str.draw(this.ctx);
    }

    up(p : Point) {
        // ???
    }
}
export class Draw {
    private static MARGIN = 24;
    private static TOOLHEIGHT = 24;

    private canvas : HTMLCanvasElement;
    private select : HTMLSelectElement;
    private ctx : CanvasRenderingContext2D;
    private drawing : Drawing = [];

    private readonly strokeTool : Tool;
    private readonly nullTool : Tool = {
        down(_ : Point) { },
        drag(_ : Point) { },
        up(_ : Point) {}
    }
    private readonly rectangleTool : Tool;
    private tool : Tool;

    constructor(canvas : HTMLCanvasElement, select : HTMLSelectElement) {
        this.canvas = canvas;
        this.select = select;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.addEventListener('mousedown', (e) => this.mouseDown(e));
        canvas.addEventListener('mousemove', (e) => this.mouseMoved(e));
        canvas.addEventListener('mouseup', (e) => this.mouseUp(e));
        // canvas.addEventListener('mousedies', (e) => this.mouseUp(e));
        const window = document.defaultView;
        if (window) {
            const action = () => {
                this.setSize(window.innerWidth - Draw.MARGIN, window.innerHeight - Draw.MARGIN - Draw.TOOLHEIGHT);
                this.repaint();
            };
            action();
            window.addEventListener('resize',action);
        }
        this.strokeTool = new StrokeTool(this.drawing, this.ctx);
        this.rectangleTool = new RectangleTool(this.drawing, this.ctx);
        this.tool = this.nullTool;
        select.addEventListener('change', () => {
            switch (select.value) {
                default:
                    this.tool = this.nullTool;
                    console.log("selected null");
                    break;
                case "stroke":
                    this.tool = this.strokeTool;
                    break;
                case "rectangle":
                    this.tool = this.rectangleTool;
                    console.log("Seected rectangle");
                    break;
            }
        });
    }

    repaint() {
        for (const st of this.drawing) {
            st.draw(this.ctx);
        }
    }
    setSize(width : number, height : number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    getScreenPoint(e : {clientX : number, clientY : number}) : Point {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return new Point(x, y);
    }

    mouseDown(e : MouseEvent) {
        const p = this.getScreenPoint(e);
        this.tool.down(p);
    }

    mouseMoved(e : MouseEvent) {
        const p = this.getScreenPoint(e);
        const str = this.drawing[this.drawing.length-1];
        if (e.buttons == 1) {
            this.tool.drag(p);
        }
    }

    mouseUp(e : MouseEvent) {
        const p = this.getScreenPoint(e);
        this.tool.up(p);
    }
}

export function draw() {
    const canvas = document.getElementById('myCanvas');
    const select = document.getElementById('toolSelect');
    if (canvas && select) {
        new Draw(canvas as HTMLCanvasElement, select as HTMLSelectElement);
    } else {
        console.error("couldn't find things");
    }
}
