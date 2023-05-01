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
  // Define an array of monster types with corresponding minimum and maximum damage values and descriptions.
  const monsterTypes = [
    { type: "Goblin", minDmg: 1, maxDmg: 3, health: 5, description: "A snarling goblin blocks your path." },
    { type: "Orc", minDmg: 2, maxDmg: 5, health: 5, description: "An orc with a wicked grin greets you." },
    { type: "Troll", minDmg: 4, maxDmg: 8, health: 5, description: "A towering troll stares down at you." },
    { type: "Skeleton", minDmg: 1, maxDmg: 4, health: 5, description: "A clattering skeleton stands before you." },
    { type: "Zombie", minDmg: 2, maxDmg: 5, health: 5, description: "A putrid zombie lurches towards you." },
    { type: "Ghoul", minDmg: 3, maxDmg: 7, health: 5, description: "A ghoul with glowing eyes shambles towards you." },
    { type: "Mummy", minDmg: 4, maxDmg: 9, health: 5, description: "A bandaged mummy hisses at you." },
    { type: "Vampire", minDmg: 5, maxDmg: 10, health: 5, description: "A suave vampire appears before you, baring its fangs." },
    { type: "Werewolf", minDmg: 6, maxDmg: 12, health: 5, description: "A snarling werewolf leaps out from the shadows." },
    { type: "Giant Spider", minDmg: 3, maxDmg: 7, health: 5, description: "A hairy spider with multiple eyes dangles from the ceiling." },
    { type: "Slime", minDmg: 1, maxDmg: 3, health: 5, description: "A glob of slime oozes towards you." },
    { type: "Ghost", minDmg: 2, maxDmg: 6, health: 5, description: "A wispy ghost floats towards you, moaning softly." },
    { type: "Demon", minDmg: 8, maxDmg: 15, health: 5, description: "A fearsome demon emerges from the shadows, its eyes glowing red." }

  ];

  // Select a random monster type from the array.
  const selectedType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
  // Create a new Monster object with a random health value and the selected damage range.
  const health = Math.floor(Math.random() * 10) + 1; // Generate a random health value between 1 and 10.
  const monster = new Monster(health, selectedType.minDmg, selectedType.maxDmg);
  monster.type = selectedType.type;

  // Add the monster type's description to the monster object.
  monster.description = selectedType.description;

  // Return the new Monster object.
  return monster;
}

// Define a monsterRoom component that creates a random monster.
const monsterRoom = {
  name: "Monster Room",
  createMonster: function(playerObj) {
    const level = playerObj.currentLevel;
    const minDmg = level * 1.5;
    const maxDmg = level * 2.5;
    const health = level * 4;
    const monster = createRandomMonster();
    monster.minDmg = minDmg;
    monster.maxDmg = maxDmg;
    monster.health = health;
    return monster;
  }
};


export { Monster, monsterRoom };
