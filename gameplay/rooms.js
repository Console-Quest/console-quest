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
  useAbility(player, dungeonLevel) {
    // Log a message indicating that the ability is being used
    console.log(`Using ${this.roomType} ability...`);
  
    // If the room type is a healing room, restore some of the player's missing health
    if (this.roomType === 'healing') {
      // Calculate the amount of missing health the player has
      const missingHp = player.maxHp - player.hp;
      // Restore half of the missing health to the player
      const restoreHp = Math.floor(missingHp / 2);
      player.hp += restoreHp;
      // Log a message indicating how much health was restored
      console.log(`Restored ${restoreHp} HP to player ${player.name}.`);
      console.log(`${player.name}: ${player.createHealthBar(player.maxHp)} ${player.hp}/${player.maxHp} HP`)  

    } 
  
    // If the room type is a treasure room, select a random reward and apply it to the player
    else if (this.roomType === 'treasure') {
      // Increase the player's base damage by 50%
      const damageBuff = 1.05;
      player.baseDmg *= damageBuff;
      // Log a message indicating the damage buff
      console.log(`Increased player ${player.name}'s base damage to ${player.baseDmg}.`);
    } 
  
    // If the room type is a monster room, create a new enemy and have it fight the player
    else if (this.roomType === 'monster') {
      // Create a new enemy object with scaled HP and damage based on the dungeon level
      const enemyHp = Math.ceil(1.05 * this.dungeonLevel);
      const enemyDmg = Math.ceil(1.05 * this.dungeonLevel);
      const monster = new Enemy(enemyHp, "Orc", enemyDmg);
      // Log a message indicating that the enemy has appeared
      console.log(`A ${monster.name} appeared!\n`);

      console.log(`${player.name}: ${player.createHealthBar(player.maxHp)} ${player.hp}/${player.maxHp} HP\n`)  
      console.log(`${monster.name}: ${monster.createHealthBar(monster.maxHp)} ${monster.hp}/${monster.maxHp} HP\n`)  
      
      console.log(monster)
      // Begin combat
      console.log('fight happens here')
      player.attackEnemy(monster)
      monster.attackEnemy(player)

    }
  }  
}

// Export the Rooms class
module.exports = { Rooms: Rooms };
