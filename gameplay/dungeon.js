const { Rooms } = require("./rooms");

class Dungeon {
constructor() {
  this.level = 1;
  this.healingRoomChance = 0.01;
  this.treasureRoomChance = 0.4;
  this.defaultHealingRoomChance = 0.2;
  this.defaultTreasureRoomChance = 0.2;
  this.previousRoom = null;
}

  levelUp(){
    this.level += 1;
  }

  setDefaultChance(){
    this.healingRoomChance = this.defaultHealingRoomChance;
  }

  createNewRoom(player) {
    let roomType;

    // Generate a new room type that is different from the previous one
    console.log('You search for a new room ahead \n')
    do {
      const probability = Math.random();
      if (probability < this.healingRoomChance) {
        roomType = 'healing';
        this.setDefaultChance();
      } else if (probability < this.treasureRoomChance + this.healingRoomChance) {
        roomType = 'treasure';
      } else {
        roomType = 'monster';
        this.healingRoomChance += 0.25;
      }
    } while (roomType === this.previousRoomType)

    const room = new Rooms(roomType, this.level);
    room.useAbility(player);
    this.levelUp()

    this.previousRoomType = roomType; // Set the previous room type to the current room type
    return room;
  }
  
}

module.exports = { Dungeon: Dungeon };
