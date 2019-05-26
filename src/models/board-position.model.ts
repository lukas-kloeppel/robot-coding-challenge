import { Direction } from './enums/direction.enum';

/**
 * Position on the board containing x, y, and the direction the robot is facing. Board position is immutable
 */
export class BoardPosition {

  private readonly _x: number;
  private readonly _y: number;
  private readonly _direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this._x = x;
    this._y = y;
    this._direction = direction;
  }

  /**
   * Get x value of position
   */
  get x(): number {
    return this._x;
  }

  /**
   * Get y value of position
   */
  get y(): number {
    return this._y;
  }

  /**
   * Get direction of position
   */
  get direction(): Direction {
    return this._direction;
  }
}
