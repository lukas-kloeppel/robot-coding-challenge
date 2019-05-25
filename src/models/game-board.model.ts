import { BoardPosition } from './board-position.model';

/**
 * Game board model as the area where a robot can be placed and can move
 */
export class GameBoardModel {

  private readonly x: number;
  private readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Check if the position is valid or not. This is required to check if an action can be done or not
   * @param position to check
   * @return boolean if the position is valid on the board or not
   */
  isPositionValid(position: BoardPosition): boolean {
    return position.x >= 0
      && position.x <= this.x
      && position.y >= 0
      && position.y <= this.y;

  }

}
