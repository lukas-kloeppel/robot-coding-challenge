import { RobotCommand } from '../interfaces/robot-command.interface';
import { Robot } from '../models/robot.model';
import { GameBoard } from '../models/game-board.model';
import { Direction } from '../models/enums/direction.enum';
import { BoardPosition } from '../models/board-position.model';
import { UserInteractionError } from '../errors/user-interaction.error';

/**
 * Command to place the robot on the board
 */
export class PlaceCommand implements RobotCommand {

  readonly trigger: string = 'place';

  execute(robot: Robot, board: GameBoard, args: string[]): BoardPosition {
    this.validatePlacementInput(args);

    const position: BoardPosition = this.parsePlacementInput(args);

    if (!board.isPositionValid(position)) {
      throw new UserInteractionError(
        `Cannot place the robot outside the game board. \nAvailable values for x: 0 - ${board.x} \nAvailable values for y: 0 - ${board.y}`
      );
    }

    return position;
  }

  private parsePlacementInput(args: string[]): BoardPosition {
    const x: number = Number(args[0]);
    const y: number = Number(args[1]);
    // TODO fix and make nicer
    const direction: Direction = <Direction>args[2];

    return new BoardPosition(x, y, direction);
  }

  private validatePlacementInput(args: string[]): void {
    if (args.length !== 3) {
      throw new UserInteractionError(
        'PLACE command requires the placement position (X,Y) and the compass direction (F) as arguments. \nCorrect format: PLACE X,Y,F \n Example usage: PLACE 3,2,NORTH'
      );
    }

    if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
      throw new UserInteractionError(
        'PLACE command requires the position (X, Y) to be valid numbers. \nExample usage: PLACE 3,2,NORTH'
      );
    }

    if (!Object.values(Direction).includes(args[2].toLowerCase())) {
      throw new UserInteractionError(
        'PLACE command requires the direction (F) to either be "NORTH", "EAST", "SOUTH" or "WEST". \nExample usage: PLACE 3,2,NORTH'
      );
    }

  }

}
