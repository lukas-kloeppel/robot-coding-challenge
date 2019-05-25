import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';
import { UserInteractionError } from '../errors/user-interaction.error';

/**
 * Command to print the current position of the robot on the board
 *
 * Example command: REPORT
 */
export class ReportCommand implements RobotCommand {

  readonly trigger: string = 'report';

  /**
   * Prints the current position and direction of the robot
   *
   * REPORT command requires robot to be placed
   *
   * @param robot Robot to be placed.
   * @param board Board where the simulation takes place
   * @param args No args are required for the report command
   *
   * @return Valid position of the robot (same as the position before the report command)
   */
  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    if (!robot.isRobotPlaced()) {
      throw new UserInteractionError('Robot has not yet been placed. Use the PLACE command to place the robot before using the REPORT command');
    }

    console.log(`Position of the robot: ${robot.position.x},${robot.position.y},${robot.position.direction.toUpperCase()}`);

    return robot.position;
  }

}
