const { Enemy } = require('./characters')
// Define a function for combat


// Define a class called Rooms
class Rooms {
  // Define a constructor method that takes a type, ability, and dungeon level as parameters
  constructor(type, dungeonLevel) {
    // Set the roomType property to the given type
    this.roomType = type;
    // Set the ability property to blank
    this.ability;
    // Set the dungeonLevel property to the given dungeon level
    this.dungeonLevel = dungeonLevel;
  }

  // Define a method called useAbility that takes a player object as a parameter
  useAbility(player, socket) {
    // Log a message indicating that the ability is being used
    socket.emit('message', `You discovered a ${this.roomType} room...\n`);
    // if(this.roomType === 'monster'){
    //   socket.emit('message', monster.description);
    // }

    // If the room type is a healing room, restore some of the player's missing health
    if (this.roomType === 'healing') {
      // Calculate the amount of missing health the player has
      const missingHp = player.maxHp - player.hp;
      // Restore half of the missing health to the player
      const restoreHp = Math.floor(missingHp / 2);
      player.hp += restoreHp;
      // Log a message indicating how much health was restored
      socket.emit('message', `Restored ${restoreHp} HP to player ${player.name}.\n`);
      socket.emit('message', `${player.name}: ${player.createHealthBar(player.maxHp)} ${player.hp}/${player.maxHp} HP\n`)

    }

    // If the room type is a treasure room, select a random reward and apply it to the player
    else if (this.roomType === 'treasure') {
// Define an array of buffs
const buffs = [
  { type: "damage", value: 0.05, property: "baseDmg" }, // Increase base damage by 50%
  { type: "crit", value: 0.01, property: "critChance" }, // Increase critical strike chance by 10%
  { type: "maxHp", value: 0.05, property: "maxHp"} 
];

// Choose a random buff from the array
const randomBuff = buffs[Math.floor(Math.random() * buffs.length)];

// Apply the random buff to the player
const property = randomBuff.property;
const value = randomBuff.value;

// Apply the buff to the player's property
player[property] += value * player[property];

// Log a message indicating the buff
socket.emit('message', `Increased ${player.name}'s ${property} by ${value * 100}%!\n`);
console.log(`You collect you treasure and move on... \n`);


      // If the room type is a monster room, create a new enemy and have it fight the player
    } else if (this.roomType === 'monster') {
      // Create a new enemy object with scaled HP and damage based on the dungeon level
      const enemyHp = Math.ceil(1.25 * this.dungeonLevel);
      const enemyDmg = Math.ceil(1.05 * this.dungeonLevel);
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

      // Select a random creature from the array
      const randomCreature = monsterTypes[Math.floor(Math.random() * monsterTypes.length)]

      // Create the enemy object using the selected creature's stats
      const monster = new Enemy(enemyHp, randomCreature.type, enemyDmg, randomCreature.description)
      socket.emit('message', monster.description);

      socket.emit('message', `---------- START COMBAT ----------\n`)
      do {
        socket.emit('message', `${player.name}: ${player.createHealthBar(player.maxHp)} ${player.hp}/${player.maxHp} HP\n`)
        socket.emit('message', `${monster.name}: ${monster.createHealthBar(monster.maxHp)} ${monster.hp}/${monster.maxHp} HP\n`)
        // Begin combat
        player.attackEnemy(monster, socket)
        if (monster.hp < 0) {
          socket.emit('message', `You have slain the `+(monster.name)+'\n')
          continue;
        }
        monster.attackEnemy(player, socket)

      } while (player.hp > 0 && monster.hp > 0)
    }
  }
}

// Export the Rooms class

/*



*/ 
module.exports = { Rooms: Rooms };
