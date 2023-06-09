'use strict';

// Houses character object:

class Character {
    constructor(curLvl, curHealth, maxHealth, dmgMin, dmgMax, critChance, critDmg){
        this.curLvl = curLvl,
        this.curHealth = curHealth,
        this.maxHealth = maxHealth,
        this.dmgMin = dmgMin,
        this.dmgMax = dmgMax,
        this.critChance = critChance,
        this.critDmg = critDmg;
    }

   getPlayerDmg = () => {
        let baseDamage = Math.random() * (this.dmgMax - this.dmgMin + 1) + this.dmgMin;
        return Math.random() >= 1 - this.critChance ? Math.ceil(baseDamage *= this.critDmg) : Math.floor(baseDamage);
    }
}

module.exports = Character;