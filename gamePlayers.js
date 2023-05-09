'use strict';
// Import the required libraries and modules
const { io } = require("socket.io-client");
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const socket = io(SERVER_URL);
const readline = require('node:readline');

// Create a readline interface for user input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// When the socket connects to the server, log the connection status
socket.on('connect', () => {
  console.log('Connected to server');
});

// When the socket disconnects from the server, log the disconnection status
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Listen for the 'question' event from the server, and only handle it once
socket.on('question', (message) => {
  // Prompt the user for a choice using the received message
  rl.question(message, (userChoice) => {
    // Send the user's choice back to the server using the 'answer' event
    socket.emit('answer', userChoice);
  });
});
socket.on('message', (data) => {
  console.log(data);
});

// Ask the user for their name and process the input
rl.question('Please enter your name: ', (answer) => {
  const userData = answer;
  console.log(`You entered: ${userData}`);
  // Emit the 'banana' event to the server with the user's input (name)
  socket.emit('banana', userData);
  // Close the readline interface
  // rl.close();
});
