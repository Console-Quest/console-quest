import player from './choiceRoom';

class TreasureRoom {
    constructor() {
      this.buffs = [
        { type: 'health', value: 5, response: 'You found a Constitution Buff! Health increased by' },
        { type: 'minDmg', value: 1, response: 'You found a Swift Buff! Minimum Damage increased by' },
        { type: 'maxDmg', value: 1.5, response: 'You found a Power Buff! Maximum Damage increased by' },
        { type: 'critChance', value: 0.05, response: 'You found a Accuracy Buff! Critical Chance increased by' },
        { type: 'critDmg', value: 0.25, response: 'You found a Deadly Buff! Critical Damage increased by' },
      ]
    }


    getRandomBuff = () => {
        this.player = new player(player);

        // Choose a random buff from buff objects
        let newBuff = buffs[Math.floor(Math.random() * buffs.length)];

        // Check current level of player -> use this as multiplier
            let multiplier = this.player.curLvl <= 10 ? 1 
            : this.player.curLvl <= 20 ? 2  
            : this.player.curLvl <= 30 ? 3 
            : this.player.curLvl <= 40 ? 4 
            : 5;
            
        // Multiply buff value by level multiplier
        let buffVal = newBuff.value * multiplier; 

        // Determine type of buff and return appropriate response
        let responseVal;
        switch(newBuff) {
            case 'health':
                this.player.maxHealth += buffVal;
                responseVal = `${newBuff.response} ${buffVal}. Max Health is now ${this.player.maxHealth}!`;
                break;
            case 'minDmg':
                this.player.minDmg += buffVal;
                responseVal = `${newBuff.response} ${buffVal}. Minimum Damage is now ${this.player.minDmg}!`;
                break;
            case 'maxDmg':
                this.player.maxDmg += buffVal;
                responseVal = `${newBuff.response} ${buffVal}. Maximum Damage is now ${this.player.maxDmg}!`;
                break;
            case 'critChance':
                this.player.critChance += buffVal;
                responseVal = `${newBuff.response} ${buffVal}. Critical Chance is now ${this.player.critChance}!`;
                break;
            case 'critDmg':
                this.player.critDmg += buffVal;
                responseVal = `${newBuff.response} ${buffVal}. Critical Damage is now ${this.player.critDmg}!`;
                break;
        }
        console.log(responseVal);
        return this.player;
    }
  }
  
module.exports = TreasureRoom;