import { assert } from 'chai';
import { RobotSimulator } from '../../src/robot-simulator';
import { CliService } from '../../src/services/cli.service';
import * as sinon from 'sinon';

describe('Report command', () => {

  let simulator: RobotSimulator;
  let communicationService: CliService;
  let getUserInputStub: sinon.SinonStub;
  let sendResponseToUserSpy: sinon.SinonSpy;

  // setup simulator before each test to have a "clean" setup of the board and robot
  beforeEach(() => {
    // init communication service and robot simulator
    communicationService = new CliService();
    simulator = new RobotSimulator(communicationService);

    // stub on user input promise to provide custom input
    getUserInputStub = sinon.stub(CliService.prototype, 'getUserInput');

    // spy on the response to the user to validate if the output was as assumed
    sendResponseToUserSpy = sinon.spy(CliService.prototype, 'sendResponseToUser');

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
      assert.equal(sendResponseToUserSpy.getCall(0).args[0], 'Robot has not yet been placed. Use the PLACE command to place the robot before using the REPORT command.');
      assert.equal(sendResponseToUserSpy.callCount, 1);
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
      assert.equal(sendResponseToUserSpy.getCall(0).args[0], 'Position of the robot: 3,3,SOUTH');
      assert.equal(sendResponseToUserSpy.callCount, 1);
      done();
    });

  });

});
