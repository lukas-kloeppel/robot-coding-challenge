import chalk from 'chalk';

/**
 * Monitoring service to take care of all application errors
 */
export class Monitoring {

  /**
   * Logs application errors to the command line. In a real world application we would send
   * this error to a monitoring / logging service
   * @param e Error to be logged
   */
  static logError(e: Error) {
    console.log(chalk.red(`${e.name} - ${e.message}`));
  }

}
