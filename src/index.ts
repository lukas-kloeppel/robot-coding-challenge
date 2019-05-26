import { RobotSimulator } from './simulators/robot.simulator';
import { UserCommunication } from './interfaces/user-communication.interface';
import { CliService } from './services/cli.service';
import { UserResponseType } from './models/enums/user-response-type.enum';
import { Simulator } from './interfaces/simulator.interface';

// setup cli interface
const userCommunication: UserCommunication = new CliService();

// Show start up message
userCommunication.sendMessageToUser('Robot simulator started', UserResponseType.INFO);

// Create simulator
const simulator: Simulator = new RobotSimulator(userCommunication);

// Start robot simulator
simulator.run().then(
  () => {
    // When simulator is closed, show exit message
    userCommunication.sendMessageToUser('Robot simulator finished', UserResponseType.INFO);
  }
).catch(
  (e: Error) => {
    userCommunication.sendMessageToUser('Robot simulator has been stopped because of an error', UserResponseType.ERROR);
    userCommunication.sendMessageToUser(`${e.name}: ${e.message}`, UserResponseType.ERROR);
    gracefulShutdown();
  }
);

/**
 * Close all open connections, save game and gracefully kill server.
 */
function gracefulShutdown(): void {
  // Possibly close open connections / save game result or do other actions
  userCommunication.sendMessageToUser('Shutting down server', UserResponseType.INFO);
  process.exit();

}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
