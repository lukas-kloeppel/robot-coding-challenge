import { UserInteractionError } from '../errors/user-interaction.error';
import { RobotCommand } from '../interfaces/robot-command.interface';
import { BoardPosition } from '../models/board-position.model';
import { UserResponseType } from '../models/enums/user-response-type.enum';
import { GameBoard } from '../models/game-board.model';
import { RobotSimulator } from '../simulators/robot.simulator';
import { MESSAGES } from '../static/messages';

export class PathCommand implements RobotCommand {

  readonly trigger: string = 'path';

  private endPositionX: number;
  private endPositionY: number;
  private wasHere: boolean[][];
  private board: GameBoard;

  execute(simulator: RobotSimulator, args: string[]): BoardPosition {
    const targetPosition: BoardPosition = this.validateAndParsePlaceArgs(args);

    if (!simulator.robot.isRobotPlaced()) {
      throw new UserInteractionError(MESSAGES.COMMAND_LEFT_NOT_PLACED_ERROR);
    }

    if (!simulator.board.isPositionValid(targetPosition)) {
      // this message cannot go in the messages config cause the available values are dynamic based on the board size
      throw new UserInteractionError(
        `The robot cannot be placed outside the game board. \nAvailable values for x: 0 - ${simulator.board.maxWidth} \nAvailable values for y: 0 - ${simulator.board.maxHeight}`
      );
    }

    this.endPositionX = targetPosition.x;
    this.endPositionY = targetPosition.y;
    this.board = simulator.board;
    this.wasHere = Array(this.board.maxWidth).fill(false).map(() => Array(this.board.maxHeight).fill(false));

    const resultPath: { x: number, y: number }[] = this.findPath([], simulator.robot.position.x, simulator.robot.position.y);

    if (resultPath.length === 0) {
      throw new UserInteractionError('No path available');
    }

    simulator.userCommunication.sendMessageToUser(resultPath.reverse().map(step => `${step.x},${step.y}`).join(' '), UserResponseType.MESSAGE);

    return new BoardPosition(targetPosition.x, targetPosition.y, simulator.robot.position.direction);
  }

  findPath(path: { x: number, y: number }[], x: number, y: number): { x: number, y: number }[] {
    if (x === this.endPositionX && y === this.endPositionY) {
      path.push({ x, y });
      return path;
    }

    if (!this.board.isPositionValid(new BoardPosition(x, y, null)) || this.wasHere[x][y]) {
      return [];
    }

    this.wasHere[x][y] = true;

    if (y < this.board.maxHeight - 1) {
      const newPath = this.findPath(JSON.parse(JSON.stringify(path)), x, y + 1);
      if (newPath.length > 0) {
        newPath.push({ x, y });
        return newPath;
      }
    }

    if (x < this.board.maxWidth - 1) {
      const newPath = this.findPath(JSON.parse(JSON.stringify(path)), x + 1, y);
      if (newPath.length > 0) {
        newPath.push({ x, y });
        return newPath;
      }
    }

    if (y > 0) {
      const newPath = this.findPath(JSON.parse(JSON.stringify(path)), x, y - 1);
      if (newPath.length > 0) {
        newPath.push({ x, y });
        return newPath;
      }
    }

    if (x > 0) {
      const newPath = this.findPath(JSON.parse(JSON.stringify(path)), x - 1, y);
      if (newPath.length > 0) {
        newPath.push({ x, y });
        return newPath;
      }
    }

    return [];
  }

  private validateAndParsePlaceArgs(args: string[]): BoardPosition {

    if (args.length !== 2) {
      throw new UserInteractionError(MESSAGES.COMMAND_PLACE_ARGS_LENGTH_ERROR);
    }

    // parse first and second argument into numbers for the position on the board
    const x: number = Number(args[0]);
    const y: number = Number(args[1]);

    // Validate if the first both arguments are numeric. They will be used for the position (x,y) If not, throw an interaction error.
    if (isNaN(x) || isNaN(y)) {
      throw new UserInteractionError(MESSAGES.COMMAND_PLACE_ARGS_NUMERIC_ERROR);
    }

    return new BoardPosition(x, y, null);
  }

}
