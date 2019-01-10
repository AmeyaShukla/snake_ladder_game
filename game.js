const readlineSync = require('readline-sync');
const _ = require("lodash");

class SnakeAndLadder {
  constructor() {
    this.winningPosition = 100;
    this.continueGame = true;
    this.snakes = {
      // key is mouth of the snake and value is the tail of the snake
      99: 7,
      92: 35,
      73: 53,
      31: 14,
      78: 39,
      37: 17,
    };
    this.ladders = {
      // key is starting postion of ladder and value is the final position of the ladder
      5: 25,
      22: 41,
      79: 81,
      44: 95,
      70: 89,
      28: 55,
      10: 29,
    };
    this.playersArray = []
  }

  rollDice() {

    return Math.floor((Math.random() * 6) + 1);
  }

  startGame() {
    console.log("start game");
    let playersArray = this.getTotalPlayers();
    this.playersArray = this.createPlayingOrder(playersArray);
    this.playGame();
  }

  getTotalPlayers(players) {
    let totalUsersCount = players;
    if (_.isUndefined(players) || _.isNull(players)){
      totalUsersCount = readlineSync.questionInt("Enter the number of user \n");
    }
    return Array(totalUsersCount).fill(null);
  }

  checkForWinner(value) {
    return value === this.winningPosition;
  }

  checkSnakeBite(value) {
    return this.snakes.hasOwnProperty(value);
  }

  checkLadderJump(value) {
    return this.ladders.hasOwnProperty(value);
  }

  createPlayingOrder(playersArray) {

    playersArray.forEach((item, i) => {
      readlineSync.keyIn(`Press "r" to get player ${i + 1} score `, { hideEchoBack: true, limit: 'r', mask: "" });
      let diceValue = this.rollDice();
      console.log(`player ${i + 1} scored:: ${diceValue}`);
      playersArray[i] = { position: 0, score: diceValue, name: `player${i + 1}` };
    });
    playersArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return playersArray;
  }

  playGame() {
    console.log("------------ Keep pressing 'R' to play the game and type 'P' to see the positions and Press 'B' to Quit----------");
    while (this.continueGame) {
      let key = readlineSync.keyIn("", { hideEchoBack: true, mask: "", limit: 'rRpPbB' });
      console.log("\n\n");
      switch (key) {
        case "r":
        case "R":
          this.playTurnForUsers();
          break;
        case "p":
        case "P":
          this.showCurrentPosition();
          break;
        case "B":
        case "b":
          console.log("Bye Bye");
          this.continueGame = false;
          break;
      }
    }
  }

  playTurnForUsers() {

    let playersArray = this.playersArray;
    for (let k = 0; k < playersArray.length; k++) {
      let value = this.rollDice();
      console.log(`${playersArray[k].name} rolls ${value}`);
      value += playersArray[k].position;

      if (value > this.winningPosition) {
        continue;
      }
      if (this.checkForWinner(value)) {
        console.log(`-----------------**** ${playersArray[k].name} won !!!!!****-----------------`);
        playersArray[k].position = value;
        this.showCurrentPosition();
        this.continueGame = false;
        break;
        //continue;
      }
      if (this.checkSnakeBite(value)) {
        console.log(`--------------------!!!! Ooops snake bite ${playersArray[k].name} !!!----------------------------`);
        playersArray[k].position = this.snakes[value];
        continue;
      }
      if (this.checkLadderJump(value)) {
        console.log(`----------------------!!!!! ${playersArray[k].name} got a ladder !!!--------------------------`);
        playersArray[k].position = this.ladders[value];
        continue;
      }
      playersArray[k].position = value;
    }
    this.playersArray = playersArray;
  }

  showCurrentPosition () {

    console.log("The positions after the sequence of rolls above");
    this.playersArray.map(player => {
      console.log(`${player.name} ==> ${player.position}`);
    });
  }

}

module.exports = SnakeAndLadder;