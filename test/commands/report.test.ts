import { assert } from 'chai';
import { RobotSimulator } from '../../src/simulators/robot.simulator';
import { CliService } from '../../src/services/cli.service';
import * as sinon from 'sinon';
import { MESSAGES } from '../../src/static/messages';

describe('Report command', () => {

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
      'REPORT',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], MESSAGES.COMMAND_REPORT_NOT_PLACED_ERROR);
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should report the position if the robot has been placed', (done) => {

    const commands: string[] = [
      'PLACE 3,3,SOUTH',
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
