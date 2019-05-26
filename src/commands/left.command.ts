import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';
import { Direction } from '../models/enums/direction.enum';
import { UserInteractionError } from '../errors/user-interaction.error';
import { MESSAGES } from '../static/messages';

/**
 * Command to turn the robot left on the board (e.g. change direction from north to west).
 *
 * Example Command: LEFT
 */
export class LeftCommand implements RobotCommand {

  readonly trigger: string = 'left';

  /**
   * Turn the robot 90 degrees left and stay on the same position.
   *
   * LEFT command requires robot to be placed
   *
   * @param robot Robot to be placed.
   * @param board Board where the simulation takes place
   * @param args No args are required for the left command
   *
   * @return Valid position of the robot with the new direction he is facing
   */
  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    if (!robot.isRobotPlaced()) {
      throw new UserInteractionError(MESSAGES.COMMAND_LEFT_NOT_PLACED_ERROR);
    }

    switch (robot.position.direction) {
      case Direction.NORTH:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.WEST);
      case Direction.EAST:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.NORTH);
      case Direction.SOUTH:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.EAST);
      case Direction.WEST:
        return new BoardPosition(robot.position.x, robot.position.y, Direction.SOUTH);
    }

  }

}
