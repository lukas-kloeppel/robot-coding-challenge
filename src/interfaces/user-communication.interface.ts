/**
 * User communication interface which needs to be required to be implemented by all services which offers user
 * communication
 */
export interface UserCommunication {

  /**
   * Read simple user input in as a single string. Prints a info message before the user types the command.
   * @param message The message to be displayed to the user before the data input
   * @return Returns the user input as a string
   */
  getUserInput(message: string): Promise<string>;

}
