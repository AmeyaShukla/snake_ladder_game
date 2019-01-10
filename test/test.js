const assert = require('chai').assert;
const stdin = require('mock-stdin').stdin();
const SnakeAndLadder = require("../game");
const game = new SnakeAndLadder();

describe('get total players', function () {
  it('it should return the array of length equals total player', function () {
    const response = game.getTotalPlayers(2);
    assert.lengthOf(response, 2, 'length is same as passed to get total player');
  });
});

describe('winner', function () {
  it('it will check for winner', function () {
    const response = game.checkForWinner(100);
    assert.equal(response, true, 'winner position.');
  });
});

describe('snakeBite', function () {
  it('it will check for snake bite', function () {
    const response = game.checkSnakeBite(31);
    assert.equal(response, true, 'snake bite.');
  });
});

describe('ladderJump', function () {
  it('it will check for ladder jump', function () {
    const response = game.checkLadderJump(44);
    assert.equal(response, true, 'ladder jump.');
  });
});
