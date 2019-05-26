import { RobotCommand } from '../interfaces/robot-command.interface';
import { BoardPosition } from '../models/board-position.model';
import { Direction } from '../models/enums/direction.enum';
import { UserInteractionError } from '../errors/user-interaction.error';
import { MESSAGES } from '../static/messages';
import { RobotSimulator } from '../simulators/robot.simulator';

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
   * @param simulator Robot simulator containing robot, game board and communication entities
   * @param args No args are required for the left command
   *
   * @return Valid position of the robot with the new direction he is facing
   */
  execute(simulator: RobotSimulator, args: string[]): BoardPosition {
    if (!simulator.robot.isRobotPlaced()) {
      throw new UserInteractionError(MESSAGES.COMMAND_LEFT_NOT_PLACED_ERROR);
    }

    const position: BoardPosition = simulator.robot.position;

    switch (position.direction) {
      case Direction.NORTH:
        return new BoardPosition(position.x, position.y, Direction.WEST);
      case Direction.EAST:
        return new BoardPosition(position.x, position.y, Direction.NORTH);
      case Direction.SOUTH:
        return new BoardPosition(position.x, position.y, Direction.EAST);
      case Direction.WEST:
        return new BoardPosition(position.x, position.y, Direction.SOUTH);
    }

  }

}
