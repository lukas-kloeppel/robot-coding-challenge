import { BoardPosition } from './board-position.model';

/**
 * Robot model containing the current state of the robot
 */
export class Robot {

  private _position: BoardPosition;

  /**
   * Update position of robot
   * @param position New position to update the robot with
   */
  set position(position: BoardPosition) {
    this._position = position;
  }

  /**
   * Get current position of robot
   */
  get position(): BoardPosition {
    return this._position;
  }

  /**
   * Check if the robot has been already placed on the board. A placement is required for the robot to perform further
   * actions
   * @return boolean which indicated if the robot has been placed or not;
   */
  public isRobotPlaced(): boolean {
    return !!this._position;
  }

}
