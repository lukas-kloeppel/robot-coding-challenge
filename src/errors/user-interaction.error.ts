/**
 * Error which was caused by a wrong user input or interaction. This kind off error will not stop the application,
 * it will just be displayed as a regular error message to the user.
 */

export class UserInteractionError extends Error {

  constructor(m: string) {
    super(m);
    this.name = 'UserInteractionError';

    // Set the prototype explicitly. This is required to be able to to call "instanceof UserInteractionError"
    Object.setPrototypeOf(this, UserInteractionError.prototype);
  }

}
