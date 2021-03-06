import { GameBoard } from '../models/game-board.model';
import { Robot } from '../models/robot.model';
import { RobotCommand } from '../interfaces/robot-command.interface';
import { PlaceCommand } from '../commands/place.command';
import { UserInteractionError } from '../errors/user-interaction.error';
import { ReportCommand } from '../commands/report.command';
import { MoveCommand } from '../commands/move.command';
import { RightCommand } from '../commands/right.command';
import { LeftCommand } from '../commands/left.command';
import { UserResponseType } from '../models/enums/user-response-type.enum';
import { UserCommunication } from '../interfaces/user-communication.interface';
import { Simulator } from '../interfaces/simulator.interface';

/**
 * Robot simulator class containing the logic to run the simulation process of the robot
 */
export class RobotSimulator implements Simulator {

  private _board: GameBoard;
  private _robot: Robot;
  private _commands: RobotCommand[] = [];
  private _userCommunication: UserCommunication;

  constructor(communicationInterface: UserCommunication) {
    this.init(communicationInterface);
  }

  /**
   * Initializes all required dependencies for the simulator: The game board, all available commands and the robot
   */
  private init(userCommunication: UserCommunication): void {
    this._userCommunication = userCommunication;
    this._board = new GameBoard(5, 5);
    this._robot = new Robot();

    this._commands.push(new PlaceCommand(), new ReportCommand(), new MoveCommand(), new RightCommand(), new LeftCommand());
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
        const input = await this._userCommunication.getUserInput('Enter command');

        if (input.toLowerCase().trim() === 'stop') {
          stop = true;

        } else {

          const parsedInput: { command: RobotCommand, args: string[] } = this.parseInput(input);
          // set the new position if the command was executed successfully.
          // Checks if the position is valid are done in the respective commands, so we can be sure that the action is allowed
          this._robot.position = parsedInput.command.execute(this, parsedInput.args);
        }

      } catch (error) {
        if (error instanceof UserInteractionError) {
          this._userCommunication.sendMessageToUser(error.message, UserResponseType.INFO);
        } else {
          throw error;
        }

      }

    }
  }

  /**
   * Parse the input of the user into a command to execute and a list of arguments
   * @param input The user input string
   * @return Object containing command to execute and an array of args. Array is empty if there is no argument
   */
  parseInput(input: string): { command: RobotCommand, args: string[] } {
    // split input into command string and array of other arguments
    const [commandString, ...splitArgs] = input.trim().split(' ');

    const executableCommand: RobotCommand = this._commands.find(c => c.trigger === commandString.toLowerCase());
    if (!executableCommand) {
      throw new UserInteractionError(
        `The command '${commandString}' is not supported by the robot simulator.\nList of available commands: ${this._commands.map(c => c.trigger.toUpperCase()).join(', ')}`);
    }

    return {
      command: executableCommand,
      // join other arguments to get one string again and split this string by comma to get the list of all args, this
      // is required because we need to ensure that the user does not enter the args with spaces before / after the comma
      // we also need to remove empty arguments (leading / trailing comma)
      args: splitArgs.join('').split(',').filter(arg => arg.length > 0)
    };

  }

  get robot(): Robot {
    return this._robot;
  }

  get board(): GameBoard {
    return this._board;
  }

  get userCommunication(): UserCommunication {
    return this._userCommunication;
  }

}
