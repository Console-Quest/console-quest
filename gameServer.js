'use strict'

// package imports and env variables
const { Server } = require("socket.io");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const KEY = process.env.OPENAI_API_KEY
const ORG = process.env.ORG

// import our classes here
const { Dungeon } = require('./gameplay/dungeon.js');
const { Player, Enemy } = require('./gameplay/characters.js');



const runGame = (playerInfo) => {
console.log(`Welcome ${playerInfo.name} To Console Quest`)
  const dungeon = new Dungeon();

  do {
  dungeon.createNewRoom(playerInfo);
  } while (playerInfo.hp > 0);
  console.log('You have been slain. GAME OVER');
  } 



// The code below is the server connecting the client, this is how I get information back and forth

const io = new Server(PORT);
let playerName = "";

io.on("connection", (socket) => {
  console.log('New client connected');
  
  socket.on('banana', async (data) => {
   playerName = await data;

  let playerInstance = new Player(10, playerName, 'human');
runGame(playerInstance)
    // this is where playerName gets updated.
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// The code below is the chat GPT API Need to make this a function

// console.log(playerName);
// playerName is the response from the client side. 


// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: `${ORG}`,
//     apiKey: `${KEY}`,
// });
// const openai = new OpenAIApi(configuration);

// // message.content is the prompt that sends to the API
// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{role: "user", content: "Pretend you are a text adventure game from the 80s, I need all responses to be 1 sentence, short and descriptive. i just stumbled into a room full or riches and a dragon , can you describe it"}],
// });

// // This is just the response displayed as a string
// console.log(completion.data.choices[0].message.content);

// The Code below will handle all the fuctionality

/* TODO List:

Get data from the user to create a new player object.
Start a new game by creating a dungeon instance and passing our created player object into it
The dungeon will handle the loop

*/



console.log(`Listening on ${PORT}`);


