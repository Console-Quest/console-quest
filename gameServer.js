'use strict'

// Import necessary packages and environment variables
const { Server } = require("socket.io");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const KEY = process.env.OPENAI_API_KEY
const ORG = process.env.ORG
const io = new Server(PORT);
const readline = require('node:readline');

// Import OpenAI API and configure it using environment variables
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: `${ORG}`,
    apiKey: `${KEY}`,
});
const openai = new OpenAIApi(configuration);

// Define an async function that takes a message and returns a chatbot response using OpenAI API
async function getCompletion(message) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: `${message}`}],
  });

  return completion.data.choices[0].message.content;
}


// Import classes from other modules
const { Dungeon } = require('./gameplay/dungeon.js');
const { Player, Enemy } = require('./gameplay/characters.js');


// Define a function that runs the game with a given player and welcome message
const runGame = (playerInfo, welcomeMessage) => {
  console.log(welcomeMessage + '\n');
  
  const dungeon = new Dungeon();

  do {
    // Create a new room and continue the game while the player's hp is above 0
    dungeon.getUserRoomChoice(playerInfo)
    // Passed info to userRoomChoice, to let user choose left or right, then passes player info to createNewRoom on invocation
    // dungeon.createNewRoom(playerInfo);
  } while (playerInfo.hp > 0);

  console.log('Your enemy delivers a fatal blow. GAME OVER');
}

// Define a variable to store the player name
let playerName = "";

// Set up a connection listener for incoming client requests
io.on("connection", (socket) => {
  console.log('New client connected');

  // Listen for the 'banana' event and update the playerName variable with the received data
  socket.on('banana', async (data) => {
    playerName = await data;
    let playerInstance = new Player(100, `${playerName}`, 'human');
    let message = `Pretend you're a text adventure game from the 80's, in one sentence, welcome our new ${playerInstance.race} by the name of ${playerInstance.name} to the world of Console Quest. They start the adventure approaching a dungeon and they run quickly inside, describe this.`

    // Call the getCompletion function to generate a welcome message and then run the game with the generated message
    getCompletion(message).then((generatedWelcomeMessage) => {
      runGame(playerInstance, generatedWelcomeMessage);
    });
  });

  // Listen for the 'answer' event and log the received data
  socket.on('answer', (data) => {
    console.log(`Received answer "${data}" from client`);
  });

  // Listen for disconnection events and log them
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Log the port number the server is listening on
console.log(`Listening on ${PORT}`);

module.exports = { runGame: runGame };

