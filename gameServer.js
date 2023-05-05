'use strict'

/// Import necessary packages and environment variables
const { Server } = require("socket.io");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const { getCompletion } = require("./openaiHelper");
const io = new Server(PORT);

// Import OpenAI API and configure it using environment variables
const { Configuration, OpenAIApi } = require("openai");
const Bottleneck = require('bottleneck');
const limiter = new Bottleneck({ minTime: 1000 }); // 1000ms between requests

const configuration = new Configuration({
    organization: `${process.env.ORG}`,
    apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAIApi(configuration);
const cache = new Map();

// Import classes from other modules
const { Dungeon } = require('./gameplay/dungeon.js');
const { Player, Enemy } = require('./gameplay/characters.js');

// Define a function that runs the game with a given player and welcome message
const runGame = (playerInfo, welcomeMessage, socket) => {
  socket.emit('message', welcomeMessage + '\n');
  
  const dungeon = new Dungeon();

  const getNextRoom = () => {
    socket.emit('message',`Ahead of you lies a door to the right and a door to the left. Which do you choose? \n`)
    if (playerInfo.hp > 0) {
      socket.emit('question', '(Type "left" or "right"): \n');
    } else {
      socket.emit('message', 'Your enemy delivers a fatal blow. GAME OVER');
    }
  }

  socket.on('answer', (data) => {
    console.log(`Received answer "${data}" from client`);
    if (data === 'left' || data === 'right') {
      socket.emit('message', `You chose the ${data} door.\n`);
      dungeon.createNewRoom(playerInfo, socket);
      getNextRoom();
    } else {
      socket.emit('message', 'Invalid choice, please type "left" or "right".\n');
      getNextRoom();
    }
  });

  getNextRoom();
}



// Define a variable to store the player name
let playerName = "";

// Set up a connection listener for incoming client requests
io.on("connection", (socket) => {
  console.log('New client connected');

  // Listen for the 'banana' event and update the playerName variable with the received data
  socket.on('banana', async (data) => {
  playerName = await data;
  let playerInstance = new Player(100, `${playerName}`, 'human', socket);
  let message = `Pretend you're a text adventure game from the 80's, in one sentence, welcome our new ${playerInstance.race} by the name of ${playerInstance.name} to the world of Console Quest. They start the adventure approaching a dungeon and they run quickly inside, describe this.`

  // Call the getCompletion function to generate a welcome message and then run the game with the generated message
  getCompletion(message).then((generatedWelcomeMessage) => {
    runGame(playerInstance, generatedWelcomeMessage, socket);
  });
});


  // Listen for the 'answer' event and log the received data
  socket.on('answer', (data) => {
    // console.log(`Received answer "${data}" from client`);
    if (data === 'left' || data === 'right') {
      socket.emit('message', `You chose the ${data} door.`);
    } else {
      socket.emit('message', 'Invalid choice, please type "left" or "right".');
      socket.emit('question', '(Type "left" or "right")');
    }
  });

  // Listen for disconnection events and log them
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Log the port number the server is listening on
console.log(`Listening on ${PORT}`);

module.exports = { runGame: runGame};

