import { GameBoardModel } from './models/game-board.model';
import { UserCommunication } from './interfaces/user-communication.interface';
import { CliService } from './services/cli.service';
import { Robot } from './models/robot';

/**
 * Robot simulator class containing the logic to run the simulation process of the robot
 */
export class RobotSimulator {

  private board: GameBoardModel;
  private communicationService: UserCommunication;
  private robot: Robot;

  constructor() {
    this.initSimulation();
  }

  /**
   * Initializes all required steps of the simulator like the game board, the user communication and the robot itself
   */
  private initSimulation(): void {
    this.communicationService = new CliService();
    this.board = new GameBoardModel(5, 5);
    this.robot = new Robot();
  }

  /**
   * Run the simulator. This is the starting point of the simulator and will walk the user through the
   * simulation process
   */
  public async run(): Promise<any> {
    const result = await this.communicationService.getUserInput('Enter a command');

    console.log(result);
  }

}
