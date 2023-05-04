// import monster from './monsterRoom';
// import player from './choiceRoom';

class Combat {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
    }

    runCombat() {
        let turn = true;
        while (this.monster.health > 0) {
            if (this.player.health <= 0) {
                handlePlayerDeath();
            }
            if (turn === true){
                playerTurn(this.player, this.monster)
                turn = false;
            } else {
                monsterTurn(this.monster, this.player);
                turn = true;
            }
        }
        // player victory
        console.log(`You have slain the ${this.monster.type}!`);
        return this.player;
    }
}


const playerTurn = (player, monster) => {
    // Add player attack option / ChatGPT description here
    let dmgDealt = getPlayerDmg(player);
    monster.health -= dmgDealt; 
    return monster;
}

const monsterTurn = (monster, player) => {
    // Add ChatGPT monster attack description here
    let dmgDealt = getMonsterDmg(monster);
    player.health -= dmgDealt; 
    return player;
}

const getMonsterDmg = (monster) => {
    return Math.floor(Math.random() * (monster.maxDmg - this.minDmg + 1)) + monster.minDmg;
}

const getPlayerDmg = (player) => {
    let baseDamage = Math.random() * (player.dmgMax - player.dmgMin + 1) + player.dmgMin;
    return Math.random() >= 1 - player.critChance ? Math.ceil(baseDamage *= player.critDmg) : Math.floor(baseDamage);
}

const handlePlayerDeath = () => console.log('You died lol');
    // Add player death ChatGPT description here
    // End game

    

module.exports = Combat;