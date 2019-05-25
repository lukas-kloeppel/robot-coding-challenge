import * as inquirer from 'inquirer';
import { MonitoringService } from './monitoring.service';
import { UserCommunication } from '../interfaces/user-communication.interface';

/**
 * Util handling all cli related actions like reading of an input string.
 */
export class CliService implements UserCommunication {

  /**
   * Read a simple user input from the command line.
   * @param message The message which will be displayed when prompting the user input
   * @return Trimmed string of the input provided by the user
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
      MonitoringService.logError(e);
      throw new Error('Unable to get user input');
    }

  }

}
