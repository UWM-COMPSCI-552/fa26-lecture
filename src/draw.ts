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
    private drawing : Stroke[] = [];

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
            console.log('drawing  stroke of size ', st.size());
            st.draw(this.ctx);
        }
    }
    setSize(width : number, height : number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    mouseDown(e : MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (this.select.value === "stroke") { ... } 
        const str = new Stroke("black");
        str.add(new Point(x, y));
        this.drawing.push(str);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    mouseMoved(e : MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const str = this.drawing[this.drawing.length-1];
        if (e.buttons == 1) {
            str.add(new Point(x, y));
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            // this.repaint();
        }
    }

    mouseUp(e : MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // this.ctx.closePath();
        this.ctx.lineTo(x, y);
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
