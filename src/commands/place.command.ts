import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { Direction } from '../models/enums/direction.enum';
import { BoardPosition } from '../models/board-position.model';
import { UserInteractionError } from '../errors/user-interaction.error';
import { MESSAGES } from '../static/messages';

/**
 * Command to place the robot on the board.
 * Place command always requires of 3 arguments, two arguments (number) for the position (x,y) on the board and
 * one argument for the compass direction the robot is facing.
 *
 * Available directions: NORTH, EAST, SOUTH, WEST
 *
 * Example command: PLACE 1,2,NORTH
 *
 */
export class PlaceCommand implements RobotCommand {

  readonly trigger: string = 'place';

  /**
   * Try to place the robot on the board. If the input is not valid or the placement would be outside the board,
   * nothing will happen and an error will be displayed.
   *
   * Requires three arguments to be executed:
   * First argument: x (has to be a number)
   * Second argument: y (has to be a number)
   * Third argument: direction (has to be NORTH, EAST, SOUTH or WEST)
   *
   * @param robot Robot to be placed.
   * @param board Board where the simulation takes place
   * @param args List of arguments that are required for the place command
   *
   * @return Valid position of the robot to be placed
   */
  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    const position: BoardPosition = this.validateAndParsePlaceArgs(args);

    if (!board.isPositionValid(position)) {
      // this message cannot go in the messages config cause the available values are dynamic based on the board size
      throw new UserInteractionError(
        `The robot Cannot be placed outside the game board. \nAvailable values for x: 0 - ${board.x} \nAvailable values for y: 0 - ${board.y}`
      );
    }

    return position;
  }

  /**
   * Validate and parse the arguments of the place commands and create a position out of it.
   * First argument: x (has to be a number)
   * Second argument: y (has to be a number)
   * Third argument: direction (has to be NORTH, EAST, SOUTH or WEST)
   *
   * Before the arguments are parsed, they will be validated.
   *
   * @param args Arguments passed from the user input
   */
  private validateAndParsePlaceArgs(args: string[]): BoardPosition {
    // Check if there are three arguments entered with the PLACE command. If not, throw an interaction error.
    if (args.length !== 3) {
      throw new UserInteractionError(MESSAGES.COMMAND_PLACE_ARGS_LENGTH_ERROR);
    }

    // parse first and second argument into numbers for the position on the board
    const x: number = Number(args[0]);
    const y: number = Number(args[1]);

    // Validate if the first both arguments are numeric. They will be used for the position (x,y) If not, throw an interaction error.
    if (isNaN(x) || isNaN(y)) {
      throw new UserInteractionError(MESSAGES.COMMAND_PLACE_ARGS_NUMERIC_ERROR);
    }

    // Validate if third parameter is a valid compass direction. If not, throw an interaction error.
    if (!Object.values(Direction).includes(args[2].toLowerCase())) {
      throw new UserInteractionError(MESSAGES.COMMAND_PLACE_ARGS_INVALID_DIRECTION_ERROR);
    }

    // TODO fix and make nicer
    const direction: Direction = <Direction>args[2].toLowerCase();

    return new BoardPosition(x, y, direction);
  }

}
