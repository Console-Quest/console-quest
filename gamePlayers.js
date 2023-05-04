'use strict';
const { io } = require("socket.io-client");
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const socket = io(SERVER_URL);
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Please enter your name: ', (answer) => {
  const userData = answer;
  console.log(`You entered: ${userData}`);
  socket.emit('banana', userData); // emit event with user's input
  rl.close();
});


socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

console.log();


