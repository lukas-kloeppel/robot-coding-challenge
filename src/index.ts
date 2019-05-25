import { RobotSimulator } from './robot-simulator';
import chalk from 'chalk';

// Show start up message
console.log(chalk.blue('Robot simulator started'));

// Create simulator
const simulator: RobotSimulator = new RobotSimulator();

// Start robot simulator
simulator.run().then(
  () => {
    // When simulator is closed, show exit message
    console.log(chalk.blue('Robot simulator finished'));
  }
).catch(
  (e: Error) => {
    console.log(chalk.red('Robot simulator has been stopped because of an error'));
    console.log(chalk.red(`${e.name}: ${e.message}`));
    gracefulShutdown();
  }
);

/**
 * Close all open connections, save game and gracefully kill server.
 */
function gracefulShutdown(): void {
  // Possibly close open connections / save game result or do other actions
  console.log(chalk.blue('Shutting down server'));
  process.exit();

}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
