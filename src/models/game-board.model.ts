import { BoardPosition } from './board-position.model';

/**
 * Game board model as the area where a robot can be placed and can move
 */
export class GameBoard {

  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  /**
   * Check if the position is valid or not, in this case if the position would be on the board or not.
   * This is required to check if an command can be executed or not.
   * @param position Board position to check
   * @return Indicator if the position is valid or not
   */
  isPositionValid(position: BoardPosition): boolean {
    if (!position) {
      return false;
    }

    return position.x >= 0
      && position.x <= this._x
      && position.y >= 0
      && position.y <= this._y;
  }

  /**
   * Get max x value for board
   */
  get x(): number {
    return this._x;
  }

  /**
   * Get max y value for board
   */
  get y(): number {
    return this._y;
  }
}
