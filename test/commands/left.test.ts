import { assert } from 'chai';
import { RobotSimulator } from '../../src/simulators/robot.simulator';
import { CliService } from '../../src/services/cli.service';
import * as sinon from 'sinon';

describe('Left command', () => {

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
      'LEFT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Robot has not yet been placed. Use the PLACE command to place the robot before using the LEFT command.');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should turn from south to east', (done) => {

    const commands: string[] = [
      'PLACE 3,3,SOUTH',
      'LEFT',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 3,3,EAST');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should turn from east to north', (done) => {

    const commands: string[] = [
      'PLACE 3,3,EAST',
      'LEFT',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 3,3,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should turn from north to west', (done) => {

    const commands: string[] = [
      'PLACE 3,3,NORTH',
      'LEFT',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 3,3,WEST');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should turn from west to south', (done) => {

    const commands: string[] = [
      'PLACE 3,3,WEST',
      'LEFT',
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 3,3,SOUTH');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });
});
