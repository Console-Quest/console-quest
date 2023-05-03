// Define a class called Rooms
class Rooms {
  // Define a constructor method that takes a type and ability as parameters
  constructor(type, ability) {
    // Set the roomType property to the given type
    this.roomType = type;
    // Set the ability property to the given ability
    this.ability = ability;
  }

  // Define a method called useAbility that takes a player object as a parameter
  useAbility(player) {
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
    } 
    
    // If the room type is a treasure room, buff the player's base damage
    else if (this.roomType === 'treasure') {
      // Increase the player's base damage by 50%
      const damageBuff = 1.5;
      player.baseDmg *= damageBuff;
      // Log a message indicating the damage buff
      console.log(`Increased player ${player.name}'s base damage by ${damageBuff}.`);
    } 
    
    // If the room type is a monster room, create a new enemy and have it fight the player
    else if (this.roomType === 'monster') {
      // Create a new enemy object with 50 HP and 10 base damage
      const monster = new Enemy(50, "Orc", 10);
      // Log a message indicating that the enemy has appeared
      console.log(`A ${monster.name} appeared!`);
      
      // Continue fighting until either the player or the monster dies
      while (player.hp > 0 && monster.hp > 0) {
        // Player attacks the monster
        player.attackEnemy(monster);
        // Log a message indicating the player's attack and the monster's remaining health
        console.log(`Player ${player.name} attacked ${monster.name} for ${player.baseDmg} damage!`);
        console.log(`Monster ${monster.name} has ${monster.hp} HP remaining.`);

        // Check if the monster is still alive
        if (monster.hp <= 0) {
          // If the monster is dead, log a message indicating that the player won
          console.log(`Player ${player.name} defeated ${monster.name}!`);
          break;
        }

        // Monster attacks the player
        monster.attack(player);
        // Log a message indicating the monster's attack and the player's remaining health
        console.log(`${monster.name} attacked player ${player.name} for ${monster.baseDmg} damage!`);
        console.log(`Player ${player.name} has ${player.hp} HP remaining.`);
      }

      // If the player is dead, log a message indicating that the player lost
      if (player.hp <= 0) {
        console.log(`Player ${player.name} was defeated by ${monster.name}!`);
      }
    }
  }
}

// Export the Rooms class
module.exports = { Rooms: Rooms };
