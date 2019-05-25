import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';
import { Direction } from '../models/enums/direction.enum';
import { UserInteractionError } from '../errors/user-interaction.error';

/**
 *  Command to turn the robot right on the board (e.g. change direction from north to east)
 */
export class RightCommand implements RobotCommand {

  readonly trigger: string = 'right';

  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    if (!robot.isRobotPlaced()) {
      throw new UserInteractionError('Robot has not been placed so far. Use the PLACE command to place the robot before using the RIGHT command');
    }

    switch (robot.position.direction) {
      case Direction.NORTH:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.EAST);
      case Direction.EAST:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.SOUTH);
      case Direction.SOUTH:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.WEST);
      case Direction.WEST:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.NORTH);
    }

  }

}
