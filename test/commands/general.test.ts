import { assert, expect } from 'chai';
import { RobotSimulator } from '../../src/simulators/robot.simulator';
import { CliService } from '../../src/services/cli.service';
import * as sinon from 'sinon';

describe('Command', () => {

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

  it('should print an error if the command is unknown', (done) => {
    const commands: string[] = [
      'TEST',
      'STOP'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      expect(sendMessageToUserSpy.getCall(0).args[0]).to.contain('The command \'TEST\' is not supported by the robot simulator.');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should accept lower case commands', (done) => {
    const commands: string[] = [
      'place 0,1,north',
      'report',
      'stop'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 0,1,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

  it('should remove unnecessary spaces in the input', (done) => {
    const commands: string[] = [
      ' place 0 , 1 ,   north ',
      ' report ',
      'stop'
    ];

    for (let i = 0; i < commands.length; i = i + 1) {
      getUserInputStub.onCall(i).resolves(commands[i]);
    }

    simulator.run().then(() => {
      assert.equal(sendMessageToUserSpy.getCall(0).args[0], 'Position of the robot: 0,1,NORTH');
      assert.equal(sendMessageToUserSpy.callCount, 1);
      done();
    });

  });

});
