const { getCompletion } = require('../openaiHelper.js');
const chalk = require("chalk");

  // Define a Character class with a constructor method that takes a hit points parameter
  class Character {
    constructor(hp) {
      this.hp = Math.max(hp, 0); // Set the hit points property to the given value

    }

    // Define an attack method that takes a target and damage parameter and calls the target's takeDamage method
    attack(target, damage) {
      target.takeDamage(damage);
    }

    // Define a takeDamage method that reduces the character's hit points by the given amount of damage


  }

  // Define a Player class that extends the Character class
  class Player extends Character {
    // Define a constructor method that takes a hit points, username, and species parameter
    constructor(hp, userName, race) {
      super(Math.max(hp, 0)); // Call the super constructor with the hit points parameter
      this.name = userName; // Set the name property to the given username
      this.race = race; // Set the race property to the given race name
      this.baseDmg = 10; // Set the base damage property to the given race damage
      this.baseCritChance = 0.1; // Set the base crit chance property to the given race crit chance
      this.baseCritMulti = 1.5; // Set the base crit multiplier property to the given race crit multiplier
      this.maxHp = hp; // Set the max hit points property to the given hit points
    }

    // Define a checkForCrit method that generates a random number and returns true if it is less than or equal to the base crit chance
    checkForCrit() {
      const random = Math.random();
      if (random <= this.baseCritChance) {
        return true;
      }
      return false;
    }

    // Define an attackEnemy method that calculates the damage of the player's attack, checks for a critical hit, and applies the damage to the enemy
    async attackEnemy(enemy, socket) {
      let didCrit = this.checkForCrit();
      let damage = didCrit ? this.baseDmg * this.baseCritMulti : this.baseDmg;
      let didCritResponse = didCrit
      ? chalk.red(`Critical hit! - You deal ${damage}\n`)
      : chalk.green(`You deal ${damage}\n`);
      let response = chalk.yellow(`Pretend you're a text adventure game from the 80's. A player is fighting an ${enemy.name}. The player strikes the enemy for ${didCritResponse}. Describe it and inform me of how much damage the player did.\n`);
      
      // Use await to get the generated message
      const generatedMessage = await getCompletion(response, 'system');
      socket.emit('message', generatedMessage);
  
      super.attack(enemy, Math.ceil(damage));
    }

    takeDamage(damage) {
      this.hp -= damage;
    }

    // Define a createHealthBar method that takes a length parameter and returns a health bar string
    createHealthBar(length) {
      if (this.hp <= 0) {
        return '░'.repeat(length); // return an empty health bar
      }

      const filledLength = Math.round((this.hp / this.maxHp) * length);
      const filledBar = '█'.repeat(filledLength);
      const emptyBar = '░'.repeat(length - filledLength);
      const healthBar = filledBar + emptyBar;

      return healthBar;
    }

  }

  // Define an Enemy class that extends the Character class
  class Enemy extends Character {
    constructor(hp, name, baseDmg, description) {
      super(Math.ceil(hp));
      this.name = name;
      this.baseDmg = baseDmg;
      this.maxHp = hp;
      this.description = description;
    }

    // Define an attack method that takes a target parameter and reduces the target's hit points by the enemy's base damage
    async attackEnemy(enemy, socket) {
      let damage = this.baseDmg;
      let message = chalk.red(
        `Pretend you're a text adventure game from the 80's. A player is fighting an ${enemy.name}. The player gets hit for ${damage}. Describe it and inform the player on how much life they lost\n`
      );
      
      // Use await to get the generated message
      const generatedMessage = await getCompletion(message, 'system');
      socket.emit('message', generatedMessage);
      
      enemy.takeDamage(damage);
    }

    takeDamage(damage) {
      this.hp -= damage
    }

    createHealthBar(length) {
      if (this.hp <= 0) {
        return '░'.repeat(length); // return an empty health bar
      }

      const filledLength = Math.round((this.hp / this.maxHp) * length);
      const filledBar = '█'.repeat(filledLength);
      const emptyBar = '░'.repeat(length - filledLength);
      const healthBar = filledBar + emptyBar;

      return healthBar;
    }

  }

  // Export the Enemy and Player classes
  module.exports = {
    Enemy: Enemy,
    Player: Player
  };

