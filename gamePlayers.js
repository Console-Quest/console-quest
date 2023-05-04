'use strict';
const { io } = require("socket.io-client");
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const socket = io(SERVER_URL);
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.once('question', (message) => {
  // Prompt the user for a choice
  rl.prompt(message, (userChoice) => {
    // Send the userChoice to the server
    socket.emit('answer', userChoice);
  });
});


rl.question('Please enter your name: ', (answer) => {
  const userData = answer;
  console.log(`You entered: ${userData}`);
  socket.emit('banana', userData); // emit event with user's input
  rl.close();
});