import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';
import { UserInteractionError } from '../errors/user-interaction.error';

/**
 * Command to print the current position of the robot on the board
 */
export class ReportCommand implements RobotCommand {

  readonly trigger: string = 'report';

  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    if (!robot.isRobotPlaced()) {
      throw new UserInteractionError('Robot has not been placed so far. Use the PLACE command to place the robot before using the REPORT command');
    }

    console.log(`Current position of the robot: ${robot.position.x},${robot.position.y},${robot.position.direction.toUpperCase()}`);

    return robot.position;
  }

}
