export class Draw {
    private static MARGIN = 24;

    private canvas : HTMLCanvasElement;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        canvas.addEventListener('mousedown', (e) => this.mouseDown(e));
        canvas.addEventListener('mousemove', (e) => this.mouseMoved(e));
        canvas.addEventListener('mouseup', (e) => this.mouseUp(e));
        const window = document.defaultView;
        if (window) {
            const action = () => {
                this.setSize(window.innerWidth - Draw.MARGIN, window.innerHeight - Draw.MARGIN);
            };
            action();
            window.addEventListener('resize',action);
        }
    }

    setSize(width : number, height : number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    mouseDown(e : MouseEvent) {
        // TODO
    }

    mouseMoved(e : MouseEvent) {
        // TODO
    }

    mouseUp(e : MouseEvent) {
        // TODO
    }
}

export function draw() {
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        new Draw(canvas as HTMLCanvasElement);
    }
}
