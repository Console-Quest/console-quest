import character from './playLoop';

// generate instance of new monster room 
// Define a Monster class with properties for health, minimum damage, and maximum damage.
class Monster {
    constructor(health, minDmg, maxDmg) {
      this.health = health;
      this.minDmg = minDmg;
      this.maxDmg = maxDmg;
    }
  
    // Define a method to calculate the monster's damage.
    calculateDamage() {
      return Math.floor(Math.random() * (this.maxDmg - this.minDmg + 1)) + this.minDmg;
    }
  }
  
  // Define a function to create a random monster.
  function createRandomMonster() {
    // Define an array of monster types with corresponding minimum and maximum damage values.
    const monsterTypes = [
      { type: "Goblin", minDmg: 1, maxDmg: 3 },
      { type: "Orc", minDmg: 2, maxDmg: 5 },
      { type: "Troll", minDmg: 4, maxDmg: 8 }
    ];
  
    // Select a random monster type from the array.
    const selectedType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
  
    // Create a new Monster object with a random health value and the selected damage range.
    const health = Math.floor(Math.random() * 10) + 1; // Generate a random health value between 1 and 10.
    const monster = new Monster(health, selectedType.minDmg, selectedType.maxDmg);
  
    // Return the new Monster object.
    return monster;
  }
  
  // Define a monsterRoom component that creates a random monster.
  const monsterRoom = {
    name: "Goblin Lair",
    description: "You have entered a Goblin lair. A fierce monster is staring at you.",
    createMonster: function() {
      return createRandomMonster();
    }
  };

  