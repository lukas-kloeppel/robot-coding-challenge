export const MESSAGES = {
  COMMAND_LEFT_NOT_PLACED_ERROR: 'Robot has not yet been placed. Use the PLACE command to place the robot before using the LEFT command.',
  COMMAND_RIGHT_NOT_PLACED_ERROR: 'Robot has not yet been placed. Use the PLACE command to place the robot before using the RIGHT command.',
  COMMAND_MOVE_NOT_PLACED_ERROR: 'Robot has not yet been placed. Use the PLACE command to place the robot before using the MOVE command.',
  COMMAND_MOVE_OUT_OF_BOARD_ERROR: 'MOVE command has been ignored because Robot would fall off the board. Please turn robot before reusing the MOVE command.',
  COMMAND_REPORT_NOT_PLACED_ERROR: 'Robot has not yet been placed. Use the PLACE command to place the robot before using the REPORT command.',
  COMMAND_PLACE_ARGS_LENGTH_ERROR: 'PLACE command requires the placement position (X,Y) and the compass direction (F) as arguments. \nCorrect format: PLACE X,Y,F \n Example usage: PLACE 3,2,NORTH',
  COMMAND_PLACE_ARGS_NUMERIC_ERROR: 'PLACE command requires that the position (X, Y) are valid numbers. \nExample usage: PLACE 3,2,NORTH',
  COMMAND_PLACE_ARGS_INVALID_DIRECTION_ERROR: 'PLACE command requires the direction (F) to be either NORTH, EAST, SOUTH, WEST. \nExample usage: PLACE 3,2,NORTH'

};
