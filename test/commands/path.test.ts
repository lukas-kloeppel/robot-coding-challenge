import { assert } from 'chai';
import { RobotSimulator } from '../../src/simulators/robot.simulator';
import { CliService } from '../../src/services/cli.service';
import * as sinon from 'sinon';
import { MESSAGES } from '../../src/static/messages';
import { Obstacle } from '../../src/models/obstacle.model';

describe('PATH command', () => {

  let simulator: RobotSimulator;
  let communicationService: CliService;
  let getUserInputStub: sinon.SinonStub;
  let sendMessageToUserSpy: sinon.SinonSpy;

  // setup simulator before each test to have a "clean" setup of the board and robot
  beforeEach(() => {
    // init communication service and robot simulator
    communicationService = new CliService();
    simulator = new RobotSimulator(communicationService);

    // stub on user input promise to provide custom input
    getUserInputStub = sinon.stub(CliService.prototype, 'getUserInput');

    // spy on the response to the user to validate if the output was as assumed
    sendMessageToUserSpy = sinon.spy(CliService.prototype, 'sendMessageToUser');

  });

  afterEach(() => {
    // remove all stubs and spies
    sinon.restore();
  });

  it('should print the positions when going to the path without an obstacle 1', (done) => {

    const commands: string[] = [
      'PLACE 0,0,NORTH',
      'PATH 2,2',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], '0,0 0,1 0,2 0,3 0,4 1,4 2,4 3,4 4,4 4,3 4,2 4,1 4,0 3,0 3,1 3,2 3,3 2,3 2,2');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 2,2,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print the positions when going to the path without an obstacle 2', (done) => {

    const commands: string[] = [
      'PLACE 0,0,NORTH',
      'PATH 1,1',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], '0,0 0,1 0,2 0,3 0,4 1,4 2,4 3,4 4,4 4,3 4,2 4,1 4,0 3,0 3,1 3,2 3,3 2,3 2,2 2,1 2,0 1,0 1,1');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 1,1,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print the positions when going to the path without an obstacle 3', (done) => {

    const commands: string[] = [
      'PLACE 0,0,NORTH',
      'PATH 4,4',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], '0,0 0,1 0,2 0,3 0,4 1,4 2,4 3,4 4,4');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 4,4,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print an error if no path is available', (done) => {

    const commands: string[] = [
      'PLACE 0,0,NORTH',
      'PATH 4,4',
      'REPORT',
      'STOP'
    ];

    const obstacles: Obstacle[] = [];

    obstacles.push(new Obstacle(3, 4));
    obstacles.push(new Obstacle(4, 3));

    simulator.board.addObstacles(obstacles);

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'No path available');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 0,0,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print the positions when going to the path with obstacles 1', (done) => {

    const commands: string[] = [
      'PLACE 0,0,NORTH',
      'PATH 2,2',
      'REPORT',
      'STOP'
    ];

    const obstacles: Obstacle[] = [];

    obstacles.push(new Obstacle(3, 3));
    obstacles.push(new Obstacle(0, 1));
    obstacles.push(new Obstacle(4, 4));

    simulator.board.addObstacles(obstacles);

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], '0,0 1,0 1,1 1,2 1,3 1,4 2,4 2,3 2,2');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 2,2,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print the positions when going to the path with obstacles 2', (done) => {

    const commands: string[] = [
      'PLACE 0,0,NORTH',
      'PATH 1,3',
      'REPORT',
      'STOP'
    ];

    const obstacles: Obstacle[] = [];

    obstacles.push(new Obstacle(2, 0));
    obstacles.push(new Obstacle(0, 2));
    obstacles.push(new Obstacle(1, 2));
    obstacles.push(new Obstacle(3, 3));
    obstacles.push(new Obstacle(4, 4));

    simulator.board.addObstacles(obstacles);

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], '0,0 0,1 1,1 2,1 2,2 2,3 2,4 1,4 1,3');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 1,3,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

});
