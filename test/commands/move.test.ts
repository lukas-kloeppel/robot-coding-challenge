import { assert } from 'chai';
import { RobotSimulator } from '../../src/simulators/robot.simulator';
import { CliService } from '../../src/services/cli.service';
import * as sinon from 'sinon';
import { MESSAGES } from '../../src/static/messages';

describe('Move command', () => {

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

  it('should print an error if robot has bot been placed', (done) => {

    const commands: string[] = [
      'MOVE',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_MOVE_NOT_PLACED_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should print an error if the robot would fall of on the south edge and not move', (done) => {

    const commands: string[] = [
      'PLACE 3,0,SOUTH',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_MOVE_OUT_OF_BOARD_ERROR);
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 3,0,SOUTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print an error if the robot would fall of on the west edge and not move', (done) => {

    const commands: string[] = [
      'PLACE 0,3,WEST',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_MOVE_OUT_OF_BOARD_ERROR);
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 0,3,WEST');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print an error if the robot would fall of on the north edge and not move', (done) => {

    const commands: string[] = [
      'PLACE 3,5,NORTH',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_MOVE_OUT_OF_BOARD_ERROR);
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 3,5,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should print an error if the robot would fall of on the east edge and not move', (done) => {

    const commands: string[] = [
      'PLACE 5,3,EAST',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_MOVE_OUT_OF_BOARD_ERROR);
      assert.equal(sendMessageToUserSpy.getCall(1).args[0], 'Position of the robot: 5,3,EAST');
      assert.equal(sendMessageToUserSpy.callCount, 2);
      done();
    });

  });

  it('should move to the south', (done) => {

    const commands: string[] = [
      'PLACE 2,2,SOUTH',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 2,1,SOUTH');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should move to the west', (done) => {

    const commands: string[] = [
      'PLACE 2,2,WEST',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 1,2,WEST');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should move to the north', (done) => {

    const commands: string[] = [
      'PLACE 2,2,NORTH',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 2,3,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should move to the east', (done) => {

    const commands: string[] = [
      'PLACE 2,2,EAST',
      'MOVE',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 3,2,EAST');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

});
