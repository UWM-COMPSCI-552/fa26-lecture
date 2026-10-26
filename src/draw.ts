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

interface Settings {
    color : string;
}

class StrokeTool implements Tool {
    private str : Stroke = new Stroke();
    private drawing : Drawing;
    private ctx : CanvasRenderingContext2D;
    private settings : Settings;

    constructor(drawing : Drawing, ctx : CanvasRenderingContext2D, settings : Settings) {
        this.drawing = drawing;
        this.ctx = ctx;
        this.settings = settings;
    }

    down(p : Point) {
        this.str = new Stroke(this.settings.color);
        this.str.add(p);
        this.drawing.push(this.str);
        this.ctx.strokeStyle = this.settings.color;
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
    private str : Rectangle = new Rectangle(new Point(0,0),0,0,"black");
    private drawing : Drawing;
    private ctx : CanvasRenderingContext2D;
    private initial : Point = new Point(0,0);
    private repaint : () => void;
    private settings : Settings;

    constructor(drawing : Drawing, ctx : CanvasRenderingContext2D, settings : Settings, repaint : () => void) {
        this.drawing = drawing;
        this.ctx = ctx;
        this.settings = settings;
        this.repaint = repaint;
    }
    
    down(p : Point) {
        this.str = new Rectangle(p,0,0,this.settings.color);
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
        this.repaint();
    }
}
export class Draw {
    private static MARGIN = 24;
    private static TOOLHEIGHT = 24;

    private canvas : HTMLCanvasElement;
    // private select : HTMLSelectElement;
    private color : HTMLInputElement;
    private ctx : CanvasRenderingContext2D;
    private drawing : Drawing = [];
    private settings : Settings = { color: "black" };

    private readonly strokeTool : Tool;
    private readonly nullTool : Tool = {
        down(_ : Point) { },
        drag(_ : Point) { },
        up(_ : Point) {}
    }
    private readonly rectangleTool : Tool;
    

    constructor(canvas : HTMLCanvasElement, select : HTMLSelectElement, color : HTMLInputElement) {
        this.canvas = canvas;
        this.color = color;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        let tool : Tool = this.nullTool;
        function setTool(t : Tool) {
            tool = t;
        }

        const mouseDown = (e:MouseEvent) => {
            const p = this.getScreenPoint(e);
            tool.down(p);
        };
        const mouseMoved = (e:MouseEvent) => {
            const p = this.getScreenPoint(e);
            const str = this.drawing[this.drawing.length-1];
            if (e.buttons == 1) {
                tool.drag(p);
            }
        }
        const mouseUp = (e:MouseEvent) => {
            const p = this.getScreenPoint(e);
            tool.up(p);
        }
        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('mousemove', mouseMoved);
        canvas.addEventListener('mouseup', mouseUp);
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
        this.strokeTool = new StrokeTool(this.drawing, this.ctx, this.settings);
        this.rectangleTool = new RectangleTool(this.drawing, this.ctx, this.settings, this.repaint);
        
        select.addEventListener('change', () => {
            switch (select.value) {
                default:
                    setTool(this.nullTool);
                    console.log("selected null");
                    break;
                case "stroke":
                    setTool(this.strokeTool);
                    break;
                case "rectangle":
                    setTool(this.rectangleTool);
                    console.log("Seected rectangle");
                    break;
            }
        });
        color.addEventListener('change', () => {
            this.settings.color = color.value;
        });
    }

    repaint() {
        this.ctx.reset();
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

}

export function draw() {
    const canvas = document.getElementById('myCanvas');
    const select = document.getElementById('toolSelect');
    const color = document.getElementById("colorSelect") as HTMLInputElement;
    if (canvas && select) {
        new Draw(canvas as HTMLCanvasElement, select as HTMLSelectElement, color);
    } else {
        console.error("couldn't find things");
    }
}
