# Robot Coding Challenge

The content of the repository is a robot coding challenge test. See the detailed description of the challenge in the file `CODING_TEST_CHALLENGE.md`.

The coding challenge is written in Typescript and NodeJs and is packed with webpack.

## Installation

### Prerequisites
- Node v8.16.0 (https://nodejs.org/en/download/)
- npm v6.4.1

Run `npm install` in the root directory of the application to install all required packages.

## Getting started

The application is a robot simulator about a robot that can be placed and moved on a square tabletop with the dimensions 5 units x 5 units.

The user can move the robot with cli commands, but the robot is prevented from falling off the square tabletop.

### Running the application

Type ``npm run serve`` on the root level to start the application.

After successfully building and running the application, the command line interface will print the following:

```plain
Robot simulation started
Enter command
```  

After these lines have been printed, the application has started successfully and the user can start entering the commands to control the robot.

### Source Code

All source code is placed in the ``src`` folder of the application and broke down into multiple different modules and classes.

## Commands

### PLACE

The ``PLACE`` command places the robot on the board. The robot can be replaced even if it has been previously placed.

The ``PLACE`` command always requires 3 arguments: `X`, `Y` and `F`. The arguments are separated by a comma.
 
- The first argument `X` describes the position of the robot on the horizontal axis, where the value `0` is the most left / west point.
- The second argument `Y` describes the position of the robot on the vertical axis, where the value  `0` is the most bottom / northern point.
- The third argument ``F`` describes the direction in which robot is facing, the available options are `SOUTH`, `WEST`, `NORTH` and `EAST`.

Syntax: `PLACE X,Y,F`

Example usage: ``PLACE 2,2,NORTH``

#### Restrictions
- The robot cannot be placed outside the board.

### MOVE

The ``MOVE`` command moves the robot one step further in the direction in which it is facing.
 
No further arguments are supported.

Example usage: ``MOVE``

#### Restrictions
- The robot must be placed before the ``MOVE`` command can be used.
- The robot cannot move outside the board. The ``MOVE`` command is ignored if the robot moves outside the board with the command.

### LEFT

The ``LEFT`` command rotates the robot 90 degrees to the left (counterclockwise). The robot is not be moved by the `LEFT` command.

No further arguments are supported.

Example usage: ``LEFT``

#### Restrictions
- The robot must be placed before the ``LEFT`` command can be used.

### RIGHT

The ``RIGHT`` command rotates the robot 90 degrees to the right (clockwise). The robot is not be moved by the `RIGHT` command.

No further arguments are supported.

Example usage: ``RIGHT``

#### Restrictions
- The robot must be placed before the ``RIGHT`` command can be used.

### REPORT

The ``REPORT`` command will print the current position on the board and the direction the robot is facing. The robot does not perform any further action with the `REPORT` command.

No further arguments are supported.

Example usage: ``REPORT``

#### Restrictions
- The robot must be placed before the ``REPORT`` command can be used.

### STOP

The ``STOP`` command stops the robot simulation and closes the program. The user must restart the application before he can perform any further actions.

No further arguments are supported.

Example usage: ``STOP``


## Example usage

```plain
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
```

```plain
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST
```

```plain
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 3,3,NORTH
```

```plain
PLACE 3,2,EAST
MOVE
LEFT
MOVE
LEFT
LEFT
MOVE
RIGHT
MOVE
REPORT
Output: 3,2,WEST
``` 

```plain
PLACE 0,0,NORTH
MOVE
MOVE
MOVE
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
MOVE
MOVE
Output: 0,0,WEST
``` 

## Unit tests

Unit tests are written with mocha, chai and sinon. The coverage is tracked with nyc. All unit tests are placed in the `test` folder.
 
 The `command` tests are more full integration tests instead of only testing the command function.
 
 
### Run unit tests

Type ``npm run test`` to run all unit tests.

### Test coverage

The test coverage will be printed at the end of each run. To additionally view the code coverage, open the ``coverage/index.html`` file in your file browser.

## Documentation

TypeScript docs are automatically generated based on the code and the comments in the code.

Run ``npm run docs`` to generate the documentation for the latest code.

After generating the documentation successfully, the full documentation is available in the ``docs/index.html`` file.