import { assert } from 'chai';
import { RobotSimulator } from '../../src/simulators/robot.simulator';
import { CliService } from '../../src/services/cli.service';
import * as sinon from 'sinon';
import { MESSAGES } from '../../src/static/messages';

describe('Place command', () => {

  // this message cannot go in the messages config cause the available values are dynamic based on the board size
  const BOARD_SIZE_ERROR: string = 'The robot Cannot be placed outside the game board. \nAvailable values for x: 0 - 5 \nAvailable values for y: 0 - 5';

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

  it('should print an error if not enough args are passed #1', (done) => {

    const commands: string[] = [
      'PLACE',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_LENGTH_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if not enough args are passed #2', (done) => {

    const commands: string[] = [
      'PLACE 1',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_LENGTH_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if not enough args are passed #3', (done) => {

    const commands: string[] = [
      'PLACE 1,2',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_LENGTH_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if not enough args are passed #4', (done) => {

    const commands: string[] = [
      'PLACE ,1,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_LENGTH_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if passed position args are not numeric #1', (done) => {

    const commands: string[] = [
      'PLACE test,2,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_NUMERIC_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if passed position args are not numeric #2', (done) => {

    const commands: string[] = [
      'PLACE test,test,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_NUMERIC_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if passed position args are not numeric #3', (done) => {

    const commands: string[] = [
      'PLACE 1,test,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_NUMERIC_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if passed position args are not numeric #4', (done) => {

    const commands: string[] = [
      'PLACE null,1,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_NUMERIC_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if passed compass direction arg is not valid', (done) => {

    const commands: string[] = [
      'PLACE 1,1,NORTHEAST',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_PLACE_ARGS_INVALID_DIRECTION_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if the robot would not be placed on the board #1', (done) => {

    const commands: string[] = [
      'PLACE 6,5,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], BOARD_SIZE_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if the robot would not be placed on the board #2', (done) => {

    const commands: string[] = [
      'PLACE 5,6,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], BOARD_SIZE_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if the robot would not be placed on the board #3', (done) => {

    const commands: string[] = [
      'PLACE -1,5,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], BOARD_SIZE_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if the robot would not be placed on the board #4', (done) => {

    const commands: string[] = [
      'PLACE 2,-1,NORTH',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], BOARD_SIZE_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should not place the robot if the position was not valid', (done) => {

    const commands: string[] = [
      'PLACE 2,-1,NORTH',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], BOARD_SIZE_ERROR);
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], MESSAGES.COMMAND_REPORT_NOT_PLACED_ERROR);

      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should place the robot on the board', (done) => {

    const commands: string[] = [
      'PLACE 2,2,NORTH',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 2,2,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should allow replacing of the robot on the board', (done) => {

    const commands: string[] = [
      'PLACE 2,2,NORTH',
      'REPORT',
      'PLACE 4,3,EAST',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 2,2,NORTH');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 4,3,EAST');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should keep the initial robot position if the second place was incorrect', (done) => {

    const commands: string[] = [
      'PLACE 2,2,NORTH',
      'REPORT',
      'PLACE 7,7,EAST',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 2,2,NORTH');
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], BOARD_SIZE_ERROR);
      assert.equal(sendMessageToUserSpy.getCall(2).args[0], 'Position of the robot: 2,2,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 3);
      done();
    });

  });

});
