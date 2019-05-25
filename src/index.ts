import { RobotSimulator } from './services/robot-simulator';
import chalk from 'chalk';

console.log(chalk.blue('Robot simulation started'));

const simulation = new RobotSimulator();

simulation.run().then(
  () => {
    console.log(chalk.blue('Robot simulation successfully finished'));
  }
).catch(
  (e: any) => {
    console.error('Robot simulation has been stopped because of an error: ');
    console.error(e);
    gracefulShutdown();
  }
);

/**
 * close all open connections and save game
 */
function gracefulShutdown(): void {
  // Possibly close open connections /  save game result or do other actions
  console.info('Shutting down server');
  process.exit();

}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
