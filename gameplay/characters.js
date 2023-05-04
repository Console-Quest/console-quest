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
  constructor(hp, userName, species) {
    super(Math.max(hp, 0)); // Call the super constructor with the hit points parameter
    this.name = userName; // Set the name property to the given username
    this.species = species; // Set the species property to the given species name
    this.baseDmg = 10; // Set the base damage property to the given species damage
    this.baseCritChance = 0.1; // Set the base crit chance property to the given species crit chance
    this.baseCritMulti = 1.5; // Set the base crit multiplier property to the given species crit multiplier
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
  attackEnemy(enemy) {
    let damage = this.baseDmg;
    if (this.checkForCrit()) {
      damage *= this.baseCritMulti;
      console.log("Critical hit!");
    }
    console.log(`You attack for ${Math.ceil(damage)} hp\n`)
    super.attack(enemy, Math.ceil(damage));
  }

  takeDamage(damage) {
    this.hp -= damage
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
  constructor(hp, name, baseDmg) {
    super(Math.ceil(hp));
    this.name = name;
    this.baseDmg = baseDmg;
    this.maxHp = hp;
  }

  // Define an attack method that takes a target parameter and reduces the target's hit points by the enemy's base damage
  attackEnemy(enemy) {
    let damage = this.baseDmg;
    console.log(`You get hit for ${damage} hp\n`)
    enemy.takeDamage(damage)
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

