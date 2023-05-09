const { Enemy } = require("./characters");
const { getCompletion } = require("../openaiHelper.js");
const chalk = require("chalk");

// Define a function for combat
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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
  createMonster() {
    console.log("$$$$$$$$$$$$$$$$$$", this.dungeonLevel);
    const enemyHp = Math.ceil(1.05 * this.dungeonLevel);
    const enemyDmg = Math.ceil(1.01 * this.dungeonLevel);
    const monsterTypes = [
      {
        type: "Goblin",
        dmgMin: 1,
        dmgMax: 1,
        health: 5,
        description: "A snarling goblin blocks your path.\n",
      },
      {
        type: "Orc",
        dmgMin: 2,
        dmgMax: 3,
        health: 10,
        description: "An orc with a wicked grin greets you.\n",
      },
      {
        type: "Troll",
        dmgMin: 3,
        dmgMax: 4,
        health: 25,
        description: "A towering troll stares down at you.\n",
      },
      {
        type: "Skeleton",
        dmgMin: 1,
        dmgMax: 1,
        health: 5,
        description: "A clattering skeleton stands before you.\n",
      },
      {
        type: "Zombie",
        dmgMin: 2,
        dmgMax: 3,
        health: 10,
        description: "A putrid zombie lurches towards you.\n",
      },
      {
        type: "Ghoul",
        dmgMin: 3,
        dmgMax: 4,
        health: 25,
        description: "A ghoul with glowing eyes shambles towards you.\n",
      },
      {
        type: "Mummy",
        dmgMin: 2,
        dmgMax: 4,
        health: 15,
        description: "A bandaged mummy hisses at you.\n",
      },
      {
        type: "Vampire",
        dmgMin: 4,
        dmgMax: 5,
        health: 30,
        description: "A suave vampire appears before you, baring its fangs.\n",
      },
      {
        type: "Werewolf",
        dmgMin: 4,
        dmgMax: 5,
        health: 30,
        description: "A snarling werewolf leaps out from the shadows.\n",
      },
      {
        type: "Giant Spider",
        dmgMin: 3,
        dmgMax: 4,
        health: 25,
        description:
          "A hairy spider with multiple eyes dangles from the ceiling.\n",
      },
      {
        type: "Slime",
        dmgMin: 3,
        dmgMax: 3,
        health: 15,
        description: "A glob of slime oozes towards you.\n",
      },
      {
        type: "Ghost",
        dmgMin: 2,
        dmgMax: 6,
        health: 20,
        description: "A wispy ghost floats towards you, moaning softly.\n",
      },
      {
        type: "Demon",
        dmgMin: 5,
        dmgMax: 7,
        health: 40,
        description:
          "A fearsome demon emerges from the shadows, its eyes glowing red.\n",
      },
    ];

    const randomCreature =
      monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

    return new Enemy(
      Math.ceil(enemyHp * randomCreature.health),
      randomCreature.type,
      Math.ceil(enemyDmg * randomCreature.dmgMin),
      randomCreature.description
    );
  }
  // Define a method called useAbility that takes a player object as a parameter
  async useAbility(player, socket, monster) {
    // Log a message indicating that the ability is being used
    socket.emit(
      "message",
      `You discovered a ${chalk.green(this.roomType)} room...\n`
    );
  
    // If the room type is a healing room, restore some of the player's missing health
    if (this.roomType === "healing") {
      // Calculate the amount of missing health the player has
      let missingHp = player.maxHp - player.hp;
      // Restore half of the missing health to the player
      let restoreHp = Math.floor(missingHp / 2);
      player.hp += restoreHp;
      // Log a message indicating how much health was restored
      socket.emit(
        "message",
        `${chalk.green("Restored")} ${restoreHp} HP to player ${chalk.yellow(
          player.name
        )}.\n`
      );
      socket.emit(
        "message",
        `${chalk.yellow(player.name)}: ${player.createHealthBar(
          player.maxHp
        )} ${player.hp}/${player.maxHp} HP\n`
      );
    }
  
    // If the room type is a treasure room, select a random reward and apply it to the player
    else if (this.roomType === "treasure") {
      // Define an array of buffs
      const buffs = [
        {
          type: "damage",
          value: 0.025,
          property: "baseDmg",
        }, // Increase base damage by 25%
        {
          type: "crit",
          value: 0.05,
          property: "critChance",
        }, // Increase critical strike chance by 5%
        {
          type: "maxHp",
          value: 0.05,
          property: "maxHp",
        },
      ];
  
      // Choose a random buff from the array
      const randomBuff = buffs[Math.floor(Math.random() * buffs.length)];
  
      // Apply the random buff to the player
      const property = randomBuff.property;
      const value = randomBuff.value;
  
      // Apply the buff to the player's property
      player[property] += value * player[property];
  
      // Log a message indicating the buff
      socket.emit(
        "message",
        `${chalk.green("Increased")} ${chalk.yellow(
          player.name
        )}'s ${property} by ${value * 100}%!\n`
      );
      let message = `Pretend you're a text adventure game from the 80's. A player just found something in a treasure chest to increase their ${property}. Describe it to the player and how it effects their gameplay\n`;
      // socket.emit("message", `You collect you treasure and move on... \n`);
      const generatedMessage = await getCompletion(message, "system");
      socket.emit("message", generatedMessage);
  
      // If the room type is a monster room, create a new enemy and have it fight the player
    
  } else if (this.roomType === "monster") {
    // ... rest of the code ...
    socket.emit(
      "message",
      `${chalk.red(`---------- START COMBAT ----------`)}\n`
    );
    socket.emit("message", monster.description);


    // Use the sleep function here with async/await
    await sleep(1000);

    // Modify the combat loop to use async/await
    while (player.hp > 0 && monster.hp > 0) {
      socket.emit(
        "message",
        `${player.name}: ${player.createHealthBar(
          player.maxHp
        )} ${player.hp}/${player.maxHp} HP\n`
      );
      socket.emit(
        "message",
        `${monster.name}: ${monster.createHealthBar(
          monster.maxHp
        )} ${monster.hp}/${monster.maxHp} HP\n`
      );
      // Begin combat
      await player.attackEnemy(monster, socket);
      if (monster.hp <= 0) {
        socket.emit(
          "message",
          `${chalk.green(`---------- VICTORY ----------`)}\n`
        );
        socket.emit(
          "message",
          `${chalk.green("You have slain the ")}${chalk.red(monster.name)}${chalk.green("!")} ${chalk.yellow("You continue on...")}\n`
        );
        break; // Exit the combat loop when the monster is defeated
      }
      await monster.attackEnemy(player, socket);
    }

    // After the combat is finished, log the player and monster's remaining health
    // message",
    //     `${chalk.green("Restored")} ${restoreHp} HP to player ${chalk.yellow(
    //       player.name
    //     )}.\n`
    socket.emit(
      "message",
      `${chalk.green(player.name)}: ${player.createHealthBar(
        player.maxHp
      )} ${player.hp}/${player.maxHp} HP)\n`
    );
    socket.emit(
      "message",
      `${chalk.red(monster.name)}: ${monster.createHealthBar(
        monster.maxHp
      )} ${monster.hp}/${monster.maxHp} HP\n`
    );
  }
}
}

// Export the Rooms class
module.exports = { Rooms: Rooms };
