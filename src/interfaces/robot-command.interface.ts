import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';

/**
 * Robot command interface. All robot commands need to implement the interface
 * to be able to registered and called from the robot simulator.
 */
export interface RobotCommand {

  /**
   * Action string which will trigger the command
   */
  readonly trigger: string;

  /**
   * Handler that will be executed when the command is triggered.
   * @param robot The robot entity for the simulation
   * @param board The board entity for the simulation
   * @param args The arguments to be passed to the command
   * @return returns the new position of the robot
   */
  execute(robot: Robot, board: GameBoard, args?: string[]): BoardPosition;

}
