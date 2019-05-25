import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';
import { Direction } from '../models/enums/direction.enum';
import { UserInteractionError } from '../errors/user-interaction.error';

/**
 * Command to move the robot by one step further. Checks if the new position is valid, otherwise an error is thrown
 */
export class MoveCommand implements RobotCommand {

  readonly trigger: string = 'move';

  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    if (!robot.isRobotPlaced()) {
      throw new UserInteractionError('Robot has not been placed so far. Use the PLACE command to place the robot before using the MOVE command');
    }

    let newPosition: BoardPosition;
    switch (robot.position.direction) {
      case Direction.NORTH:
        newPosition = new BoardPosition(robot.position.x, robot.position.y + 1, robot.position.direction);
        break;
      case Direction.EAST:
        newPosition = new BoardPosition(robot.position.x + 1, robot.position.y, robot.position.direction);
        break;
      case Direction.SOUTH:
        newPosition = new BoardPosition(robot.position.x, robot.position.y - 1, robot.position.direction);
        break;
      case Direction.WEST:
        newPosition = new BoardPosition(robot.position.x - 1, robot.position.y, robot.position.direction);
        break;

    }

    if (!board.isPositionValid(newPosition)) {
      throw new UserInteractionError('Robot would move outside of the board, moving process stopped. Please turn robot before moving.');
    }

    return newPosition;
  }

}
