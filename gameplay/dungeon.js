const { Rooms } = require('./rooms');
const { Player, Enemy } = require('./characters.js');
const chalk = require("chalk");


class Dungeon {
  constructor() {
    this.level = 1;
    this.healingRoomChance = 0.01;
    this.treasureRoomChance = 0.4;
    this.defaultHealingRoomChance = 0.2;
    this.defaultTreasureRoomChance = 0.2;
    this.previousRoom = null;
  }

  levelUp() {
    this.level += 1;
  }

  setDefaultChance() {
    this.healingRoomChance = this.defaultHealingRoomChance;
  }

  async combatLoop(player, enemy, socket) {
    while (player.hp > 0 && enemy.hp > 0) {
      await player.attackEnemy(enemy, socket);
      socket.emit('message', `Your health: ${player.createHealthBar(10)} (${player.hp}/${player.maxHp})\n`);
      socket.emit('message', `Enemy health: ${enemy.createHealthBar(10)} (${enemy.hp}/${enemy.maxHp})\n`);

      if (enemy.hp <= 0) {
        socket.emit('message', 'You have defeated the monster!\n');
        break;
      }

      await enemy.attackEnemy(player, socket);
      socket.emit('message', `Your health: ${player.createHealthBar(10)} (${player.hp}/${player.maxHp})\n`);
      socket.emit('message', `Enemy health: ${enemy.createHealthBar(10)} (${enemy.hp}/${enemy.maxHp})\n`);

      if (player.hp <= 0) {
        socket.emit('message', 'You have been defeated!\n');
        break;
      }
    }
  }

  async createNewRoom(player, socket) {
    let roomType;

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
    } while (roomType === this.previousRoomType);

    const newRoom = new Rooms(roomType, this.level);
    if (roomType === 'monster') {
      newRoom.monster = newRoom.createMonster(); // Assign the created monster to the newRoom.monster property
      // newRoom.useAbility(player, socket, newRoom.monster); // Pass the newRoom.monster as an argument to useAbility

      const enemy = newRoom.monster;
      socket.emit('message', 'A monster appears in the room!\n');
      socket.emit('message', `${enemy.description}\n`);

      await this.combatLoop(player, enemy, socket);
    } else {
      await newRoom.useAbility(player, socket); // Add 'await' here
      this.levelUp();
    }

    this.previousRoomType = roomType;
  }

}

module.exports = { Dungeon: Dungeon };