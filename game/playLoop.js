'use strict';
// controls choice of room and controls overall flow of game after 'start'

import getRoom from './dungeon/choiceRoom.js';
import Player from './user/character.js';



let player;

// On new game start
const newGame = () => {
    // ChatGPT API greeting here 
    player = new Player(1, 20, 20, 2, 5, 0.1, 1.5);
    console.log('You enter a room. Before you lay two doors, one on the left, and one on the right. Which door do you choose?');
}

// while player has health, keep triggering next room and recurse play()
const play = async () => {
    if (player.curHealth <= 0) {
        playerDeath();
    } else {
        const room = getRoom(player);
        console.log(room);
    }
};


const playerDeath = () => {
    // break out of game
    return `You have died. You survived ${player.curLvl} levels`;
}


newGame();
play();