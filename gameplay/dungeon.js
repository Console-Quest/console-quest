// Import the Rooms class
const { Rooms } = require("./rooms");
//const { getCompletion } = require('../gameServer.js');


// Define the Dungeon class
class Dungeon {
  constructor(getCompletionFunction) {
    this.getCompletion = getCompletionFunction;
    this.level = 1; // Initialize the level property to 1
    this.healingRoomChance = 0.01; // Initialize the healing room chance property to 0.01
    this.treasureRoomChance = 0.4; // Initialize the treasure room chance property to 0.4
    this.defaultHealingRoomChance = 0.2; // Initialize the default healing room chance property to 0.2
    this.defaultTreasureRoomChance = 0.2; // Initialize the default treasure room chance property to 0.2
    this.previousRoom = null; // Initialize the previous room property to null
  }

  levelUp() {
    this.level += 1; // Increment the level property by 1
  }

  setDefaultChance() {
    this.healingRoomChance = this.defaultHealingRoomChance; // Set the healing room chance property back to its default value
  }

  async createNewRoom(player, socket) {
    let roomType;

    // Generate a new room type that is differ'nt from the previous one
    
    do {
      const probability = Math.random();
      if (probability < this.healingRoomChance) {
        roomType = 'healing'; // Set the room type to "healing" if the random probability is less than the healing room chance property
        this.setDefaultChance(); // Set the healing room chance back to its default value
      } else if (probability < this.treasureRoomChance + this.healingRoomChance) {
        roomType = 'treasure'; // Set the room type to "treasure" if the random probability is between the healing room chance and the treasure room chance plus the healing room chance
      } else {
        roomType = 'monster'; // Set the room type to "monster" otherwise
        this.healingRoomChance += 0.25; // Increase the healing room chance property by 0.25
      }
    } while (roomType === this.previousRoomType) // Repeat the loop until the room type is different from the previous room type

    const room = new Rooms(roomType, this.level); // Create a new instance of the Rooms class with the generated room type and the current level
    room.useAbility(player, socket); // Use the room's ability on the player
    this.levelUp(); // Increase the level property by 1

    this.previousRoomType = roomType; // Set the previous room type to the current room type
    return room; // Return the new room
  }
}

// Export the Dungeon class
module.exports = { Dungeon: Dungeon };
