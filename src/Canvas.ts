import { IDrawnItem } from './DrawnItem/IDrawnItem';
export class Canvas {
	private items: IDrawnItem[] = [];
	public constructor(public readonly ctx: CanvasRenderingContext2D) {}
	public add(item: IDrawnItem) {
		this.items.push(item);
		this.redraw();
	}
	public remove(item: IDrawnItem) {
		const index = this.items.indexOf(item);
		if (index !== -1) {
			this.items.splice(index, 1);
			this.redraw();
		}
	}
	public redraw() {
		const t0 = performance.now();

		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.items.forEach(item => item.draw());

		const t1 = performance.now();

		console.log(`Call to canvas.redraw took ${t1 - t0} milliseconds.`);
	}
}