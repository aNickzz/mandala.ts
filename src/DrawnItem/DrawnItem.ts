import { App } from '../Components/App';
import { IColours } from '../mandala';
import { IDrawnItem } from './IDrawnItem';

export abstract class DrawnItem implements IDrawnItem {
	protected colours: IColours;

	public constructor(protected readonly context: App) {
		this.colours = context.colours;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
