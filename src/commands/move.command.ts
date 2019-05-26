import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { BoardPosition } from '../models/board-position.model';
import { Direction } from '../models/enums/direction.enum';
import { UserInteractionError } from '../errors/user-interaction.error';
import { MESSAGES } from '../static/messages';

/**
 * Command to move the robot by one step further. Checks if the new position is valid, otherwise an error is thrown.
 *
 * Example command: MOVE
 */
export class MoveCommand implements RobotCommand {

  readonly trigger: string = 'move';

  /**
   * Move the robot by one step into the direction he is facing.
   * If the robot would fall of the board, an error will be thrown and the robot will not move
   *
   * MOVE command requires robot to be placed
   *
   * @param robot Robot to be placed.
   * @param board Board where the simulation takes place
   * @param args No args are required for the move command
   *
   * @return Valid position of the robot to move to
   */
  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    if (!robot.isRobotPlaced()) {
      throw new UserInteractionError(MESSAGES.COMMAND_MOVE_NOT_PLACED_ERROR);
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

    // Check if the new position is valid, if not throw an interaction error.
    if (!board.isPositionValid(newPosition)) {
      throw new UserInteractionError(MESSAGES.COMMAND_MOVE_OUT_OF_BOARD_ERROR);
    }

    return newPosition;
  }

}
