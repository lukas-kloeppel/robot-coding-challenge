import { RobotCommand } from '../interfaces/robot-command.interface';
import { BoardPosition } from '../models/board-position.model';
import { UserInteractionError } from '../errors/user-interaction.error';
import { UserResponseType } from '../models/enums/user-response-type.enum';
import { MESSAGES } from '../static/messages';
import { RobotSimulator } from '../simulators/robot.simulator';

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
   * @param simulator Robot simulator containing robot, game board and communication entities
   * @param args No args are required for the report command
   *
   * @return Valid position of the robot (same as the position before the report command)
   */
  execute(simulator: RobotSimulator, args: string[]): BoardPosition {
    if (!simulator.robot.isRobotPlaced()) {
      throw new UserInteractionError(MESSAGES.COMMAND_REPORT_NOT_PLACED_ERROR);
    }

    simulator.userCommunication.sendMessageToUser(
      `Position of the robot: ${simulator.robot.position.x},${simulator.robot.position.y},${simulator.robot.position.direction.toUpperCase()}`,
      UserResponseType.MESSAGE
    );

    return simulator.robot.position;
  }

}
