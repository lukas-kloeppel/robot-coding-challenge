import { assert, expect } from 'chai';
import * as inquirer from 'inquirer';
import * as sinon from 'sinon';
import { CliService } from '../../src/services/cli.service';
import { UserResponseType } from '../../src/models/enums/user-response-type.enum';
import chalk from 'chalk';

describe('Cli Service', () => {

  let inquirerPromptStub: sinon.SinonStub;
  let consoleSpy: sinon.SinonSpy;
  let cliService: CliService;

  // setup simulator before each test to have a "clean" setup of the board and robot
  beforeEach(() => {
    inquirerPromptStub = sinon.stub(inquirer, 'prompt');
    consoleSpy = sinon.spy(console, 'log');

    cliService = new CliService();
  });

  afterEach(() => {
    // remove all stubs
    sinon.restore();
  });

  it('should read from command line', (done) => {

    inquirerPromptStub.onFirstCall().resolves({ 'user-input': 'sample-user-command' });

    cliService.getUserInput('Enter command').then((input) => {
      assert.equal(input, 'sample-user-command');
      done();
    });
  });

  it('should trim content from command line', (done) => {

    inquirerPromptStub.onFirstCall().resolves({ 'user-input': '   sample-user-command   ' });

    cliService.getUserInput('Enter command').then((input) => {
      assert.equal(input, 'sample-user-command');
      done();
    });
  });

  it('should throw an error if the there was an input exception', (done) => {

    inquirerPromptStub.onFirstCall().throwsException('Some input exception');

    cliService.getUserInput('Enter command').then(
      () => {
      }
    ).catch(
      (error: Error) => {
        assert(error.message, 'Unable to get user input');
        done();
      });
  });

  it('should print the response to the user to the console for info response type in blue', (done) => {

    cliService.sendMessageToUser('Some info output', UserResponseType.INFO).then(
      () => {
        // check content
        expect(consoleSpy.firstCall.args[0]).to.contain('Some info output');

        // check color
        assert.equal(consoleSpy.firstCall.args[0], chalk.blue('Some info output'));
        done();
      });
  });

  it('should print the response to the user to the console for message response type in default color', (done) => {

    cliService.sendMessageToUser('Some message output', UserResponseType.MESSAGE).then(
      () => {
        // check content
        assert.equal(consoleSpy.firstCall.args[0], 'Some message output');
        done();
      });
  });

  it('should print the response to the user to the console for error response type in red', (done) => {

    cliService.sendMessageToUser('Some error output', UserResponseType.ERROR).then(
      () => {
        // check content
        expect(consoleSpy.firstCall.args[0]).to.contain('Some error output');

        // check color
        assert.equal(consoleSpy.firstCall.args[0], chalk.red('Some error output'));
        done();
      });
  });

});
