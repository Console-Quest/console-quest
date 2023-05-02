'use strict';
// controls choice of room and controls overall flow of game after 'start'

import Player from './user/character';
import getRoom from './dungeon/choiceRoom';

let player = new Player(1, 20, 20, 2, 5, 0.1, 1.5);

// On new game start
const newGame = () => {
    // ChatGPT API greeting here 
    console.log('You enter a room. Before you lay two doors, one on the left, and one on the right. Which door do you choode?');
}

// while player has health, keep triggering next room and recurse play()
const play = () => {
    player.curHealth <= 0 ? playerDeath() : getRoom;
    play(); 
}

const playerDeath = () => {
    // break out of game
    return `You have died. You survived ${player.curLvl} levels`;
}