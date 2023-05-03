import monster from './monsterRoom';
import player from './choiceRoom';

class Combat {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
    }

    runCombat () {
        let turn = true;
        while (this.monster.health > 0) {
            if (this.player.health <= 0) {
                this.handlePlayerDeath();
            }
            if (turn === true){
                this.playerTurn(this.player, this.monster)
                turn = false;
            } 
            this.monsterTurn(this.monster, this.player);
            turn = true;
        }
    }

    playerTurn(player, monster) {
        // Add player attack option / ChatGPT description here
        let dmgDealt = player.getPlayerDmg();
        monster.health -= dmgDealt; 
        return monster;
    }

    monsterTurn(monster, player) {
        // Add ChatGPT monster attack description here
        let dmgDealt = monster.getMonsterDmg();
        player.health -= dmgDealt; 
        return player;
    }

    handlePlayerDeath() {
        // Add player death ChatGPT description here
        console.log('You died lol');
        // End game
    }
}

module.exports = Combat;