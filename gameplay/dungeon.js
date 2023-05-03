const { Rooms } = require("./rooms");

class Dungeon {
constructor() {
  this.level = 1;
  this.healingRoomChance = 0.1;
  this.treasureRoomChance = 0.4;
  this.defaultHealingRoomChance = 0.2;
  this.defaultTreasureRoomChance = 0.2;
}

  levelUp(){
    this.level += 1;
  }

  setDefaultChance(){
    this.healingRoomChance = this.defaultHealingRoomChance;
  }

  createNewRoom(player) {
    const probability = Math.random(); // Random Number between 0 and 1
    let room;

    if (probability < this.healingRoomChance) {
      room = new Rooms('healing', this.level);
      this.setDefaultChance();
    } else if (probability < this.treasureRoomChance + this.healingRoomChance) {
      room = new Rooms('treasure', this.level);
    } else {
      room = new Rooms('monster', this.level);
      this.healingRoomChance += 0.15
    }
    
    room.useAbility(player)
    return room;
  }
  
}

module.exports = { Dungeon: Dungeon };
