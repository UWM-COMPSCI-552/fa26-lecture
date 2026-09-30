import { Stroke } from './Stroke.js';
import { Point } from './Point.js';

export class Draw {
    private static MARGIN = 24;

    private canvas : HTMLCanvasElement;
    private ctx : CanvasRenderingContext2D;
    private drawing : Stroke[] = [];

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.addEventListener('mousedown', (e) => this.mouseDown(e));
        canvas.addEventListener('mousemove', (e) => this.mouseMoved(e));
        canvas.addEventListener('mouseup', (e) => this.mouseUp(e));
        // canvas.addEventListener('mousedies', (e) => this.mouseUp(e));
        const window = document.defaultView;
        if (window) {
            const action = () => {
                this.setSize(window.innerWidth - Draw.MARGIN, window.innerHeight - Draw.MARGIN);
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
        const str = new Stroke("black");
        str.add(new Point(e.x, e.y));
        this.drawing.push(str);
        this.ctx.beginPath();
        this.ctx.moveTo(e.x, e.y);
    }

    mouseMoved(e : MouseEvent) {
        const str = this.drawing[this.drawing.length-1];
        if (e.buttons == 1) {
            str.add(new Point(e.x, e.y));
            this.ctx.lineTo(e.x, e.y);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(e.x, e.y);
            // this.repaint();
        }
    }

    mouseUp(e : MouseEvent) {
        // this.ctx.closePath();
        this.ctx.lineTo(e.x, e.y);
        this.ctx.stroke();
    }
}

export function draw() {
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        new Draw(canvas as HTMLCanvasElement);
    }
}
