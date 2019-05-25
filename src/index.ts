import { RobotSimulator } from './robot-simulator';
import chalk from 'chalk';

console.log(chalk.blue('Robot simulation started'));

const simulator: RobotSimulator = new RobotSimulator();

simulator.run().then(
  () => {
    console.log(chalk.blue('Robot simulation finished'));
  }
).catch(
  (e: Error) => {
    console.log(chalk.red('Robot simulation has been stopped because of an error'));
    console.log(chalk.red(`${e.name}: ${e.message}`));
    gracefulShutdown();
  }
);

/**
 * close all open connections and save game
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
