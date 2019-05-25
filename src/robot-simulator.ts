import { GameBoard } from './models/game-board.model';
import { UserCommunication } from './interfaces/user-communication.interface';
import { CliService } from './services/cli.service';
import { Robot } from './models/robot.model';
import { RobotCommand } from './interfaces/robot-command.interface';
import { PlaceCommand } from './commands/place.command';
import { UserInteractionError } from './errors/user-interaction.error';
import chalk from 'chalk';
import { ReportCommand } from './commands/report.command';
import { MoveCommand } from './commands/move.command';
import { RightCommand } from './commands/right.command';
import { LeftCommand } from './commands/left.command';

/**
 * Robot simulator class containing the logic to run the simulation process of the robot
 */
export class RobotSimulator {

  private board: GameBoard;
  private communicationService: UserCommunication;
  private robot: Robot;
  private commands: RobotCommand[] = [];

  constructor() {
    this.initSimulation();
  }

  /**
   * Initializes all required steps of the simulator: The game board, the user communication, all available commands
   * and the robot
   */
  private initSimulation(): void {
    this.communicationService = new CliService();
    this.board = new GameBoard(5, 5);
    this.robot = new Robot();

    this.commands.push(new PlaceCommand(), new ReportCommand(), new MoveCommand(), new RightCommand(), new LeftCommand());
  }

  /**
   * Run the simulator. This is the starting point of the simulator and will walk the user through the
   * simulation process
   */
  public async run(): Promise<any> {
    let stop: boolean = false;

    // accept user inputs as long as the user does not enter 'stop'
    while (!stop) {
      try {
        const input = await this.communicationService.getUserInput('Enter command');

        if (input.toLowerCase().trim() === 'stop') {
          stop = true;

        } else {

          const parsedResult: { command: RobotCommand, args: string[] } = this.parseInput(input);
          // set the new position if the command was executed successfully.
          // Checks if the position is valid are done in the respective commands, so we can be sure that the action is allowed
          this.robot.position = parsedResult.command.execute(this.robot, this.board, parsedResult.args);
        }

      } catch (error) {
        if (error instanceof UserInteractionError) {
          console.log(chalk.blue(error.message));
        } else {
          throw error;
        }

      }

    }
  }

  /**
   * Parse the input of the user into a command to execute and a list of arguments
   * @param result the user input string
   * @return Object containing command to execute and a array of args. Array is empty if there is no argument
   */
  parseInput(result: string): { command: RobotCommand, args: string[] } {
    // split input into command string and array of other arguments
    const [commandString, ...splitArgs] = result.trim().split(' ');

    const executableCommand: RobotCommand = this.commands.find(c => c.trigger === commandString);
    if (!executableCommand) {
      throw new UserInteractionError(
        `The command '${commandString}' is not supported by the robot simulator.\nList of available commands: ${this.commands.map(c => c.trigger.toUpperCase()).join(', ')}`);
    }

    return {
      command: executableCommand,
      // join other arguments to get one string again and split this string by comma to get the list of all args, this
      // is required because we need to ensure that the user does not enter the args with spaces before / after the comma
      args: splitArgs.join('').split(',')
    };

  }

}
