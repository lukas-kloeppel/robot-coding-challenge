import { assert } from 'chai';
import { BoardPosition } from '../../src/models/board-position.model';
import { Direction } from '../../src/models/enums/direction.enum';

describe('Board position model', () => {

  it('should be initialized correctly', () => {
    const position: BoardPosition = new BoardPosition(0, 1, Direction.NORTH);

    assert.equal(position.x, 0);
    assert.equal(position.y, 1);
    assert.equal(position.direction, Direction.NORTH);
  });

});
