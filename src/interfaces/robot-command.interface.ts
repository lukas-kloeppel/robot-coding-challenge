import { BoardPosition } from '../models/board-position.model';
import { RobotSimulator } from '../simulators/robot.simulator';

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
   * @param simulator The simulator entity containing all data about the robot and the game board
   * @param args The arguments to be passed to the command
   * @return returns the new position of the robot
   */
  execute(simulator: RobotSimulator, args?: string[]): BoardPosition;

}
