import { RobotCommand } from '../interfaces/robot-command.interface';
import { BoardPosition } from '../models/board-position.model';
import { Direction } from '../models/enums/direction.enum';
import { UserInteractionError } from '../errors/user-interaction.error';
import { MESSAGES } from '../static/messages';
import { RobotSimulator } from '../simulators/robot.simulator';

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
   * @param simulator Robot simulator containing robot, game board and communication entities
   * @param args No args are required for the move command
   *
   * @return Valid position of the robot to move to
   */
  execute(simulator: RobotSimulator, args: string[]): BoardPosition {
    if (!simulator.robot.isRobotPlaced()) {
      throw new UserInteractionError(MESSAGES.COMMAND_MOVE_NOT_PLACED_ERROR);
    }

    const position: BoardPosition = simulator.robot.position;

    let newPosition: BoardPosition;
    switch (position.direction) {
      case Direction.NORTH:
        newPosition = new BoardPosition(position.x, position.y + 1, position.direction);
        break;
      case Direction.EAST:
        newPosition = new BoardPosition(position.x + 1, position.y, position.direction);
        break;
      case Direction.SOUTH:
        newPosition = new BoardPosition(position.x, position.y - 1, position.direction);
        break;
      case Direction.WEST:
        newPosition = new BoardPosition(position.x - 1, position.y, position.direction);
        break;

    }

    // Check if the new position is valid, if not throw an interaction error.
    if (!simulator.board.isPositionValid(newPosition)) {
      throw new UserInteractionError(MESSAGES.COMMAND_MOVE_OUT_OF_BOARD_ERROR);
    }

    return newPosition;
  }

}
