console.log('Server started');

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
