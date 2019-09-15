import { Context } from '../Context';
import { Stroke } from '../DrawnItem/Stroke';
import { Point } from '../Geometry/Point';
import { EventHandler } from '../mandala';
import { DrawItemUndo } from '../Undo/DrawItemUndo';
import { Tool } from './Tool';
export class LineTool extends Tool {
	private stroke: Stroke | null = null;
	private onMouseDownHandler: EventHandler;
	private onMouseUpHandler: EventHandler;
	private onMouseMoveHandler: EventHandler;
	private onKeyPressHandler: EventHandler;
	public constructor(context: Context) {
		super(context);
		this.onMouseDownHandler = this.onMouseDown.bind(this);
		this.onMouseUpHandler = this.onMouseUp.bind(this);
		this.onMouseMoveHandler = this.onMouseMove.bind(this);
		this.onKeyPressHandler = this.onKeyPress.bind(this);
	}

	public onMouseDown(event: MouseEvent) {
		const { x, y } = event;
		this.stroke = new Stroke(this.context);
		this.stroke.addPoint(new Point(x, y));
		this.stroke.addPoint(new Point(x, y));
		this.context.canvas.add(this.stroke);
	}

	public onMouseUp(event: MouseEvent) {
		if (this.stroke) {
			this.context.undo.push(new DrawItemUndo(this.context, this.stroke));
		}
		this.stroke = null;
	}

	public onMouseMove(event: MouseEvent) {
		if (this.stroke) {
			const { x, y } = event;
			const point = new Point(x, y);

			this.stroke.setPoint(-1, point);
		}
	}

	public onKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.cancel();
		}
	}

	public cancel() {
		if (this.stroke) {
			this.context.canvas.remove(this.stroke);
			this.stroke = null;
		}
	}

	public onActivate() {
		this.onDeactivate();
		this.context.mouse.on('mousedown', this.onMouseDownHandler);
		this.context.mouse.on('mouseup', this.onMouseUpHandler);
		this.context.mouse.on('mousemove', this.onMouseMoveHandler);
		this.context.keyboard.on('keydown', this.onKeyPressHandler);
	}

	public onDeactivate() {
		this.cancel();
		this.context.mouse.off('mousedown', this.onMouseDownHandler);
		this.context.mouse.off('mouseup', this.onMouseUpHandler);
		this.context.mouse.off('mousemove', this.onMouseMoveHandler);
		this.context.keyboard.off('keydown', this.onKeyPressHandler);
	}
}
