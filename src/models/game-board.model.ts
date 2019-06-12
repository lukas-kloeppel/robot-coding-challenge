import { BoardPosition } from './board-position.model';
import { Obstacle } from './obstacle.model';

/**
 * Game board model as the area where a robot can be placed and can move. Board is immutable
 */
export class GameBoard {

  private readonly _maxWidth: number;
  private readonly _maxHeight: number;
  private readonly _obstacles: Obstacle[] = [];

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

    return this.isOnBoard(position.x, position.y) && !this.isObstacleOnLocation(position.x, position.y);
  }

  private isObstacleOnLocation(x: number, y: number): boolean {
    return this._obstacles.filter(obst => obst.x === x && obst.y === y).length !== 0;
  }

  private isOnBoard(x: number, y: number): boolean {
    return x >= 0
      && x <= this._maxWidth
      && y >= 0
      && y <= this._maxHeight;
  }

  addObstacles(obstacles: Obstacle[]): void {
    for (const obstacle of obstacles) {
      if (this.isOnBoard(obstacle.x, obstacle.y)) {
        this._obstacles.push(obstacle);
      } else {
        console.log(`Obstacle with postion x:${obstacle.x} and y: ${obstacle.y} is not placed, cause the position would be out of the board`);
      }
    }
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
