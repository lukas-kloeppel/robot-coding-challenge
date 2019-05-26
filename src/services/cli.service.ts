import * as inquirer from 'inquirer';
import { UserCommunication } from '../interfaces/user-communication.interface';
import { UserResponseType } from '../models/enums/user-response-type.enum';
import chalk from 'chalk';

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
      throw new Error('Unable to get user input');
    }

  }

  public async sendMessageToUser(message: string, type: UserResponseType): Promise<any> {
    switch (type) {
      case UserResponseType.MESSAGE:
        console.log(message);
        break;
      case UserResponseType.INFO:
        console.log(chalk.blue(message));
        break;
      case UserResponseType.ERROR:
        console.log(chalk.red(message));
        break;
    }

    return null;
  }

}
