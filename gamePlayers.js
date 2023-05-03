'use strict';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const socket = io(SERVER_URL);
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Please enter your data: ', (answer) => {
  const userData = answer;
  console.log(`You entered: ${userData}`);
  socket.emit('userInput', userData); // emit event with user's input
  rl.close();
});


socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

console.log();


