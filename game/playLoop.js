'use strict';
// controls choice of room and controls overall flow of game after 'start'

import Player from './user/character';
import ChoiceRoom from './dungeon/choiceRoom';


// curLvl = 1
// curHealth = 20
// maxHealth = 20
// dmgMin = 2
// dmgMax = 5
// critChance = 0.1
// critDmg = 1.5

// On new game start

const newPlayer = new Player(1, 20, 20, 2, 5, 0.1, 1.5);

class GameLoop {
    constructor(player) {
        this.player = player
    }

    newGame = () => {
        // ChatGPT API greeting here 
        play(newPlayer)
    }
    
    // main play loop while player has health
    play = (player) => {
       player.curHealth <= 0 ? playerDeath(player) : console.log('You enter a room. Before you lay two doors, one on the left, and one on the right. Which door do you choose?');
        let resultFromRoom = ChoiceRoom(player);
        play(resultFromRoom); 
    }
}

const playerDeath = (player) => {
    // break out of game
    return `You have died. You survived ${player.curLvl} levels.`;
}

GameLoop(newPlayer);

module.export = GameLoop.play(player);