import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';

/**
 * Robot command interface. All robot commands need to implement this to be able to flexibly add new commands and call them
 */
export interface RobotCommand {

  /**
   * trigger command which will activate the command
   */
  readonly trigger: string;

  /**
   * handler which will be executed when the command is triggered
   * @param robot the robot entity
   * @param board the board entity
   * @param args the arguments
   * @return returns the new position of the robot
   */
  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition;

}
