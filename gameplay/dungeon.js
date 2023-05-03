const { Rooms } = require("./rooms");

class Dungeon {
constructor() {
  this.level = 1;
  this.healingRoomChance = 0.2;
  this.treasureRoomChance = 0.4;
  this.monsterRoomChance = 0.6;
  this.defaultHealingRoomChance = 0.2;
  this.defaultTreasureRoomChance = 0.4;
  this.defaultMonsterRoomChance = 0.6;
}

  levelUp() {
    if (this.level < 10) {
      this.level += 1;
      this.healingRoomChance = this.defaultHealingRoomChance;
      this.monsterRoomChance = this.defaultMonsterRoomChance;
    }
  }

  createNewRoom() {
    let room;
  
    const probability = Math.random();
    if (probability < this.healingRoomChance) {
      room = new Rooms('healing', this.level);
    } else if (probability < this.treasureRoomChance) {
      room = new Rooms('treasure', this.level);
    } else {
      room = new Rooms('monster', this.level);
    }
  
    return room;
  }
  
}

module.exports = { Dungeon: Dungeon };
