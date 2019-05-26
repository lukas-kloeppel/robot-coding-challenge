import { assert } from 'chai';
import { GameBoard } from '../../src/models/game-board.model';
import { BoardPosition } from '../../src/models/board-position.model';
import { Direction } from '../../src/models/enums/direction.enum';

describe('Game board model', () => {

  it('should be initialized correctly', () => {
    const board: GameBoard = new GameBoard(5, 5);

    assert.equal(board.maxWidth, 5);
    assert.equal(board.maxHeight, 5);
  });

  it('should be initialized correctly with different sizes for width and height', () => {
    const board: GameBoard = new GameBoard(5, 10);

    assert.equal(board.maxWidth, 5);
    assert.equal(board.maxHeight, 10);
  });

  it('should check if the position is valid on the board', () => {
    const board: GameBoard = new GameBoard(5, 5);

    const position: BoardPosition = new BoardPosition(3, 3, Direction.NORTH);

    assert.equal(board.isPositionValid(position), true);
  });

  it('should check if the position is valid on the board with dynamic sizes #1', () => {
    const board: GameBoard = new GameBoard(5, 10);

    const position: BoardPosition = new BoardPosition(3, 8, Direction.NORTH);

    assert.equal(board.isPositionValid(position), true);
  });

  it('should check if the position is valid on the board with dynamic sizes #2', () => {
    const board: GameBoard = new GameBoard(10, 5);

    const position: BoardPosition = new BoardPosition(8, 3, Direction.NORTH);

    assert.equal(board.isPositionValid(position), true);
  });

  it('should return false if the position is invalid', () => {
    const board: GameBoard = new GameBoard(5, 5);

    const position: BoardPosition = new BoardPosition(8, 3, Direction.NORTH);

    assert.equal(board.isPositionValid(position), false);
  });

  it('should return false if the position is invalid with dynamic sizes #1', () => {
    const board: GameBoard = new GameBoard(10, 5);

    const position: BoardPosition = new BoardPosition(3, 8, Direction.NORTH);

    assert.equal(board.isPositionValid(position), false);
  });

  it('should return false if the position is invalid with dynamic sizes #2', () => {
    const board: GameBoard = new GameBoard(5, 10);

    const position: BoardPosition = new BoardPosition(8, 3, Direction.NORTH);

    assert.equal(board.isPositionValid(position), false);
  });

  it('should return false if the position is null', () => {
    const board: GameBoard = new GameBoard(5, 10);

    assert.equal(board.isPositionValid(null), false);
  });

});
