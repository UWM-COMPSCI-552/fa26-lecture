import { Shape } from './Shape.js';
import { Stroke } from './Stroke.js';
import { Point } from './Point.js';

export interface DrawMode {
    down(p : Point) : void;
    drag(p : Point) : void;
    up(p : Point) : void
}
export class Draw {
    private static MARGIN = 24;
    private static TOOLHEIGHT = 24;

    private canvas : HTMLCanvasElement;
    private select : HTMLSelectElement;
    private ctx : CanvasRenderingContext2D;
    private drawing : Shape[] = [];

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
        const str = new Stroke("black");
        str.add(p);
        this.drawing.push(str);
        this.ctx.beginPath();
        this.ctx.moveTo(p.getX(), p.getY());
    }

    mouseMoved(e : MouseEvent) {
        const p = this.getScreenPoint(e);
        const str = this.drawing[this.drawing.length-1];
        if (e.buttons == 1) {
            (str as Stroke).add(p);
            this.ctx.lineTo(p.getX(), p.getY());
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(p.getX(), p.getY());
            // this.repaint();
        }
    }

    mouseUp(e : MouseEvent) {
        const p = this.getScreenPoint(e);
        // this.ctx.closePath();
        this.ctx.lineTo(p.getX(), p.getY());
        this.ctx.stroke();
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
