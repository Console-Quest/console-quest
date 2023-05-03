'use strict'
import dotenv from 'dotenv';
import { Server } from "socket.io";
dotenv.config();
const PORT = process.env.PORT || 3001;
const KEY = process.env.OPENAI_API_KEY
const ORG = process.env.ORG



import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: `${ORG}`,
    apiKey: `${KEY}`,
});
const openai = new OpenAIApi(configuration);



class Character {
  constructor(hp) {
    this.hp = hp;
  }

  attack(target, damage) {
    target.hp -= damage;
  }
}

class Player extends Character {
  constructor(hp) {
    super(hp);
  }

  rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  attackEnemy(enemy, attackType) {
    let sides;
    switch (attackType) {
      case 'weapon':
        sides = 6;
        break;
      case 'spell':
        sides = 8;
        break;
      case 'unarmed':
        sides = 4;
        break;
      default:
        throw new Error('Invalid attack type');
    }
    const roll = this.rollDice(sides);
    const damage = roll === 20 ? roll * 2 : roll;

    if (attackType === 'unarmed') {
      enemy.receiveUnarmedDamage(damage);
    } else {
      this.attack(enemy, damage);
    }
    console.log(`You attacked with ${attackType}`)
  }

  castSpell(enemies) {
    const spellDamage = this.rollDice(8);
    for (const enemy of enemies) {
      enemy.receiveSpellDamage(spellDamage);
    }
  }
}

class Enemy extends Character {
  constructor(hp, strength, magicResistance) {
    super(hp);
    this.strength = strength;
    this.magicResistance = magicResistance;
    this.maxHp = hp
  }


  attackPlayer(player) {
    const roll = Math.floor(Math.random() * this.strength) + 1;
    this.attack(player, roll);
  }

  receiveSpellDamage(damage) {
    const reducedDamage = damage * (1 - this.magicResistance);
    this.hp -= reducedDamage;
  }

  receiveUnarmedDamage(damage) {
    const strengthFactor = this.strength / 10;
    const reducedDamage = damage * (1 - strengthFactor);
    this.hp -= reducedDamage;
  }

  split() {
    if (this.hp <= 0) {
      const chance = Math.random();
      if (chance < 0.5) {
        return [new Enemy(this.hp / 2, this.strength, this.magicResistance), new Enemy(this.hp / 2, this.strength, this.magicResistance)];
      }
    }
    return null;
  }
}

class Goblin extends Enemy {
  constructor() {
    super(30, 6, 0.1);
    this.species = 'goblin' // Lower HP, moderate attack strength, low magic resistance
  }

  describe() {
    console.log('where are you spider man?')
  }
}

class Skeleton extends Enemy {
  constructor() {
    super(40, 4, 0.3);
    this.species = 'skeleton' // Moderate HP, weak attack strength, moderate magic resistance
  }

  describe() {
    console.log('a scary skeleton approaches')
  }
}

class Ogre extends Enemy {
  constructor() {
    super(60, 10, 0.2);
    this.species = 'ogre' // Higher HP, strong attack strength, slightly higher magic resistance
  }

  describe() {
    console.log('A Scary Ogre Appears')
  }
}

function createHealthBar(currentHp, maxHp, length) {
  if (currentHp <= 0) {
    return '░'.repeat(length); // return an empty health bar
  }

  const filledLength = Math.round((currentHp / maxHp) * length);
  const filledBar = '█'.repeat(filledLength);
  const emptyBar = '░'.repeat(length - filledLength);
  const healthBar = filledBar + emptyBar;

  return healthBar;
}


import readline from 'readline-sync';

function gameLoop() {
 const player = new Player(100);
  const enemyTypes = [Goblin, Skeleton, Ogre];
  let currentEnemyIndex = 0;
  let enemies = [new enemyTypes[currentEnemyIndex]()];

  while (player.hp > 0 && enemies.length > 0) {
    // Display player's health bar
    const playerHealthBar = createHealthBar(player.hp, 100, 20);
    console.log(`${playerName} HP: [${playerHealthBar}] (${player.hp}/${100})`);

    // Display enemy descriptions and HP bars
    for (const enemy of enemies) {
      enemy.describe();
      const enemyMaxHp = enemy.maxHp; // Assuming each enemy type has a fixed max HP
      const enemyHealthBar = createHealthBar(enemy.hp, enemyMaxHp, 20);
      console.log(`Enemy HP: [${enemyHealthBar}] (${Math.ceil(enemy.hp)}/${enemyMaxHp})`);
    }

    // Player's turn
    for (const enemy of enemies) {
      let attackType;
      let attackChoice = readline.question('Choose your attack type (1: weapon, 2: spell, 3: unarmed): ');

      while (attackChoice !== '1' && attackChoice !== '2' && attackChoice !== '3') {
        console.log('Invalid choice. Please choose 1, 2, or 3.');
        attackChoice = readline.question('Choose your attack type (1: weapon, 2: spell, 3: unarmed): ');
      }

      if (attackChoice === '1') {
        attackType = 'weapon';
      } else if (attackChoice === '2') {
        attackType = 'spell';
      } else if (attackChoice === '3') {
        attackType = 'unarmed';
      }

      player.attackEnemy(enemy, attackType);
    }

    // Enemy's turn
    for (const enemy of enemies) {
      enemy.attackPlayer(player);
    }

    if (enemies.length === 0 && currentEnemyIndex < enemyTypes.length - 1) {
      currentEnemyIndex++;
      enemies.push(new enemyTypes[currentEnemyIndex]());
    }
  }
  

  if (player.hp <= 0) {
    console.log('Game Over! The player has been defeated.');
  } else {
    console.log('Victory! All enemies have been defeated.');
  }
}

const io = new Server(PORT);
let playerName = "";

io.on("connection", (socket) => {
  console.log('New client connected');
  
  socket.on('userInput', async (data) => {
  playerName = data;

// message.content is the prompt that sends to the API
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: `you are a text adventure game from the 80s, my name is ${playerName}, in once sentence describe an describe an icy dungeon and me bravely going into it`}],
});

// This is just the response displayed as a string
console.log(completion.data.choices[0].message.content);



  gameLoop(); // Run the game loop
    // this is where playerName gets updated.
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// console.log(playerName);

