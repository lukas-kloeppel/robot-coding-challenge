import { BoardPosition } from './board-position.model';

/**
 * Game board model as the area where a robot can be placed and can move. Board is immutable
 */
export class GameBoard {

  private readonly _maxWidth: number;
  private readonly _maxHeight: number;

  constructor(maxWidth: number, maxHeight: number) {
    this._maxWidth = maxWidth;
    this._maxHeight = maxHeight;
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
      && position.x <= this._maxWidth
      && position.y >= 0
      && position.y <= this._maxHeight;
  }

  /**
   * Get max width of board
   */
  get maxWidth(): number {
    return this._maxWidth;
  }

  /**
   * Get max height of board
   */
  get maxHeight(): number {
    return this._maxHeight;
  }

}
