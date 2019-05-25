import * as inquirer from 'inquirer';
import { Monitoring } from './monitoring';
import { UserCommunication } from '../interfaces/user-communication.interface';

/**
 * Util handling all cli related actions like reading of an input string.
 */
export class CliService implements UserCommunication {

  /**
   * Read the simple user input from the command line.
   * @param message The message which will be displayed when prompting the user input
   * @return Promise<string> Trimmed string of the input provided by the user
   */
  public async getUserInput(message: string): Promise<string> {
    const question: inquirer.Question = {
      message,
      type: 'input',
      name: 'user-input'
    };

    try {
      const result: Record<string, any> = await inquirer.prompt([question]);

      return result['user-input'].trim();

    } catch (e) {
      Monitoring.logError(e);
      throw new Error('Unable to get user input');
    }

  }

}