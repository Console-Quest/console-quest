'use strict'
import dotenv from 'dotenv';
import { Server } from "socket.io";
dotenv.config();
const PORT = process.env.PORT || 3001;
const KEY = process.env.OPENAI_API_KEY
const ORG = process.env.ORG

const io = new Server(PORT);

io.on("connection", (socket) => {
  console.log('New client connected');
  
  socket.on('userInput', (data) => {
    console.log(`Received user input: ${data}`);
    // do something with the user's input
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

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



console.log(`Listening on ${PORT}`);
