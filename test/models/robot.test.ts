import { assert } from 'chai';
import { Robot } from '../../src/models/robot.model';
import { Direction } from '../../src/models/enums/direction.enum';
import { BoardPosition } from '../../src/models/board-position.model';

describe('Robot position model', () => {

  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  it('should be initialized correctly', () => {
    assert.isNull(robot.position);
  });

  it('should return not placed if no position was updated', () => {
    assert.isFalse(robot.isRobotPlaced());
  });

  it('should return placed if position was set', () => {
    robot.position = new BoardPosition(0, 0, Direction.NORTH);
    assert.isTrue(robot.isRobotPlaced());
  });

  it('should update the position', () => {
    robot.position = new BoardPosition(0, 0, Direction.NORTH);

    assert.equal(robot.position.x, 0);
    assert.equal(robot.position.y, 0);
    assert.equal(robot.position.direction, Direction.NORTH);

    robot.position = new BoardPosition(3, 2, Direction.EAST);

    assert.equal(robot.position.x, 3);
    assert.equal(robot.position.y, 2);
    assert.equal(robot.position.direction, Direction.EAST);
  });

});
