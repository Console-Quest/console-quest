'use strict'

// Import necessary packages and environment variables
const { Server } = require("socket.io");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const KEY = process.env.OPENAI_API_KEY
const ORG = process.env.ORG
const io = new Server(PORT);

// Import OpenAI API and configure it using environment variables
const { Configuration, OpenAIApi } = require("openai");
const Bottleneck = require('bottleneck');
const limiter = new Bottleneck({ minTime: 1000 }); // 1000ms between requests

const configuration = new Configuration({
    organization: `${ORG}`,
    apiKey: `${KEY}`,
});
const openai = new OpenAIApi(configuration);
const cache = new Map();

// Define an async function that takes a message and returns a chatbot response using OpenAI API
async function getCompletion(message) {
  if (cache.has(message)) {
    return cache.get(message);
  }

  const completion = await limiter.schedule(async () => {
    return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${message}` }],
    });
  });

  const result = completion.data.choices[0].message.content;
  cache.set(message, result);

  return result;
}


// Import classes from other modules
const { Dungeon } = require('./gameplay/dungeon.js');
const { Player, Enemy } = require('./gameplay/characters.js');

// Define a function that runs the game with a given player and welcome message
const runGame = (playerInfo, welcomeMessage, socket) => {
  console.log(welcomeMessage + '\n');
  
  const dungeon = new Dungeon(getCompletion);

  const getNextRoom = () => {
    if (playerInfo.hp > 0) {
      socket.emit('question', 'Do you want to go through the left door or the right door? (Type "left" or "right")');
    } else {
      console.log('Your enemy delivers a fatal blow. GAME OVER');
    }
  }

  socket.on('answer', (data) => {
    console.log(`Received answer "${data}" from client`);
    if (data === 'left' || data === 'right') {
      socket.emit('message', `You chose the ${data} door.`);
      dungeon.createNewRoom(playerInfo);
      getNextRoom();
    } else {
      socket.emit('message', 'Invalid choice, please type "left" or "right".');
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
  let playerInstance = new Player(100, `${playerName}`, 'human', getCompletion);
  let message = `Pretend you're a text adventure game from the 80's, in one sentence, welcome our new ${playerInstance.race} by the name of ${playerInstance.name} to the world of Console Quest. They start the adventure approaching a dungeon and they run quickly inside, describe this.`

  // Call the getCompletion function to generate a welcome message and then run the game with the generated message
  getCompletion(message).then((generatedWelcomeMessage) => {
    runGame(playerInstance, generatedWelcomeMessage, socket);
  });
});


  // Listen for the 'answer' event and log the received data
  socket.on('answer', (data) => {
    console.log(`Received answer "${data}" from client`);
    if (data === 'left' || data === 'right') {
      console.log(`You chose the ${data} door.`)
      socket.emit('message', `You chose the ${data} door.`);
    } else {
      socket.emit('message', 'Invalid choice, please type "left" or "right".');
      socket.emit('question', 'Do you want to go through the left door or the right door? (Type "left" or "right")');
    }
  });

  // Listen for disconnection events and log them
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Log the port number the server is listening on
console.log(`Listening on ${PORT}`);

module.exports = { runGame: runGame, getCompletion };