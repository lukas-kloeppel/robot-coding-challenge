/**
 * User communication interface which needs to be required to be implemented by all services which offers user
 * communication
 */
export interface UserCommunication {

  /**
   * Receive simple user input in a string format. Prints a message before the user receives the command
   * @param message The message to be displayed to the user before the input
   * @return Promise<string> Returns the user input as a string
   */
  getUserInput(message: string): Promise<string>;

}
