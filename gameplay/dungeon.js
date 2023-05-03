import { Rooms } from "./rooms";

class Dungeon {
  constructor() {
    this.level = 1;
    this.healingRoomChance = 0.2;
    this.monsterRoomChance = 0.6;
    this.defaultHealingRoomChance = 0.2;
    this.defaultMonsterRoomChance = 0.6;
  }

  levelUp() {
    this.level += 1;
    this.healingRoomChance = this.defaultHealingRoomChance;
    this.monsterRoomChance = this.defaultMonsterRoomChance;
  }

  createNewRoom() {
    const roomArr = ['treasure', 'healing', 'monster'];
    let room;

    const probability = Math.random();
    if (probability < this.healingRoomChance) {
      room = new Rooms('healing');
      this.healingRoomChance = this.defaultHealingRoomChance;
      this.monsterRoomChance = this.defaultMonsterRoomChance;
    } else if (probability < this.monsterRoomChance) {
      room = new Rooms('monster');
      this.healingRoomChance += 0.15;
      this.monsterRoomChance -= 0.15;
    } else {
      room = new Rooms('treasure');
      this.healingRoomChance += 0.15;
      this.monsterRoomChance -= 0.15;
    }

    return room;
  }
}

module.exports = { Dungeon: Dungeon };
