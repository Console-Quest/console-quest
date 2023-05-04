'use strict'

// package imports and env variables
const { Server } = require("socket.io");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const KEY = process.env.OPENAI_API_KEY
const ORG = process.env.ORG
const io = new Server(PORT);

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: `${ORG}`,
    apiKey: `${KEY}`,
});
const openai = new OpenAIApi(configuration);

async function getCompletion(message) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: `${message}`}],
  });

  return completion.data.choices[0].message.content;
}


// import our classes here
const { Dungeon } = require('./gameplay/dungeon.js');
const { Player, Enemy } = require('./gameplay/characters.js');

const runGame = (playerInfo, welcomeMessage) => {
  console.log(welcomeMessage);
  const dungeon = new Dungeon();

  do {
    // Do something with the answer
    dungeon.createNewRoom(playerInfo);
  } while (playerInfo.hp > 0);

  console.log('Your enemy delivers a fatal blow. GAME OVER');
}



let playerName = "";

io.on("connection", (socket) => {
  console.log('New client connected');

  socket.on('banana', async (data) => {
    playerName = await data;
    // this is where playerName gets updated.
    let playerInstance = new Player(100, `${playerName}`, 'human');
    let message = `Pretend youre a text adventure game from the 80's, in one sentence, welcome our new ${playerInstance.race} by the name of ${playerInstance.name} to the world of Console Quest. They start The adventure approaching a dungeon and they run quickly inside, descibe this`
    // Move the getCompletion and runGame call inside the 'banana' event listener
    getCompletion(message).then((generatedWelcomeMessage) => {
      runGame(playerInstance, generatedWelcomeMessage);
    });
  });

  // Listen for the client's answer to the question
  socket.on('answer', (data) => {
    console.log(`Received answer "${data}" from client`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

console.log(`Listening on ${PORT}`);


