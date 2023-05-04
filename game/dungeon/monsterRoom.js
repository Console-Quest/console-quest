//import player from './playLoop';
//import combat from './combat';

// generate instance of new monster room 
// Define a Monster class with properties for health, minimum damage, and maximum damage.
class Monster {
  constructor(player) {
    this.player = player;
  }
    // constructor(health, minDmg, maxDmg) {
    //   this.health = health;
    //   this.minDmg = minDmg;
    //   this.maxDmg = maxDmg;
    // }


    createRandomMonster() {
      const monsterTypes = [
      { type: "Goblin", dmgMin: 1, dmgMax: 3, health: 5, description: "A snarling goblin blocks your path." },
      { type: "Orc", dmgMin: 2, dmgMax: 5, health: 10, description: "An orc with a wicked grin greets you." },
      { type: "Troll", dmgMin: 4, dmgMax: 8, health: 20, description: "A towering troll stares down at you." },
      { type: "Skeleton", dmgMin: 1, dmgMax: 4, health: 5, description: "A clattering skeleton stands before you." },
      { type: "Zombie", dmgMin: 2, dmgMax: 5, health: 5, description: "A putrid zombie lurches towards you." },
      { type: "Ghoul", dmgMin: 3, dmgMax: 7, health: 5, description: "A ghoul with glowing eyes shambles towards you." },
      { type: "Mummy", dmgMin: 4, dmgMax: 9, health: 10, description: "A bandaged mummy hisses at you." },
      { type: "Vampire", dmgMin: 5, dmgMax: 10, health: 15, description: "A suave vampire appears before you, baring its fangs." },
      { type: "Werewolf", dmgMin: 6, dmgMax: 12, health: 20, description: "A snarling werewolf leaps out from the shadows." },
      { type: "Giant Spider", dmgMin: 3, dmgMax: 7, health: 15, description: "A hairy spider with multiple eyes dangles from the ceiling." },
      { type: "Slime", dmgMin: 1, dmgMax: 3, health: 15, description: "A glob of slime oozes towards you." },
      { type: "Ghost", dmgMin: 2, dmgMax: 6, health: 10, description: "A wispy ghost floats towards you, moaning softly." },
      { type: "Demon", dmgMin: 8, dmgMax: 15, health: 30, description: "A fearsome demon emerges from the shadows, its eyes glowing red." }
      ];
    
      // Select a random monster type from the array.
      const selectedType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    
      // Multiply health and min/max dmg by player level
      let lvlMultiplier = this.player.curLvl / 10 + 1;
      let health = selectedType.health * lvlMultiplier;
      let minDmg = selectedType.minDmg * lvlMultiplier;
      let maxDmg = selectedType.maxDmg * lvlMultiplier;
      const monster = new Monster(health , minDmg, maxDmg);
      monster.type = selectedType.type;
      monster.description = selectedType.description;
      // Return the new Monster object.
      return monster;
    }
};


  module.exports = Monster;