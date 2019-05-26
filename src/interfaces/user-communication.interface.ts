/**
 * User communication interface which needs to be required to be implemented by all services which offers user
 * communication
 */
import { UserResponseType } from '../models/enums/user-response-type.enum';

export interface UserCommunication {

  /**
   * Read simple user input in as a single string. Prints a info message before the user types the command.
   * @param message The message to be displayed to the user before the data input
   * @return Returns the user input as a string
   */
  getUserInput(message: string): Promise<string>;

  /**
   * Send a string based response to the user along with some information about the type of the message
   * @param message The message to be send to the user
   * @param type The type of the message. Different message types could be formatted differently / sent differently
   */
  sendResponseToUser(message: string, type: UserResponseType): Promise<any>;

}
