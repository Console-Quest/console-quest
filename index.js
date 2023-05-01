const readline = require('readline');

class Contestant {
  constructor(name) {
    this.name = name;
    this.guesses = [];
    this.isOver = false;
    this.score = 0;
  }

  addGuess(guess) {
    this.guesses.push(guess);
    if (guess > target) {
      this.isOver = true;
    }
    this.score = Math.abs(guess - target);
  }
}

let contestantsArr = [];

function askToPlayAgain() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Do you want to play again with the same contestants? (y/n)', answer => {
    if (answer.toLowerCase() === 'y') {
      target = generateRandomNumber();
      contestants.forEach(contestant => {
        contestant.guesses = [];
        contestant.isOver = false;
        contestant.score = 0;
      });
      getContestants(callback);
    } else {
      console.log('Thanks for playing!');
      rl.close();
    }
  });
}

let target;

function generateRandomNumber() {
  const min = 500;
  const max = 5000;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function findWinner(contestants) {
  let winner = null;
  let minScore = Number.MAX_SAFE_INTEGER;
  for (const contestant of contestants) {
    if (!contestant.isOver && contestant.score < minScore) {
      winner = contestant;
      minScore = contestant.score;
    }
  }
  return winner;
}


function getContestants(contestants) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function promptNumContestants() {
    rl.question('How many contestants are playing? ', numContestants => {

      target = generateRandomNumber();

      function promptContestant(i) {
        if (i < numContestants) {
          rl.question(`Enter the name of contestant #${i + 1}: `, name => {
            const contestant = new Contestant(name);
            rl.question(`Enter ${name}'s guess: `, guess => {
              contestant.addGuess(parseInt(guess));
              contestants.push(contestant);
              promptContestant(i + 1);
            });
          });
        } else {

          // Find the winner based on the score
          let winner = findWinner(contestants);

          if (winner) {
            console.log(`The actual retail price: ${target}`)
            console.log(`The winner is ${winner.name}.`);
            console.log('Thanks for playing')
            
          } else {
            console.log('All contestants are over the actual retail price. Thanks for playing'); 
          }
        }
      }
        promptContestant(0);
    });
  }

  promptNumContestants();
}

getContestants(contestantsArr);
