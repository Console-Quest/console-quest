import HealingRoom from './healingRoom.js';
import { Monster } from './monsterRoom.js';
import TreasureRoom from './treasureRoom.js';

let lastHealingRoom = null;
let healingRoomCounter = 0;

function getNextRoom(playerObj) {
  // Define an array of rooms with corresponding probabilities.
  const rooms = [
    { type: "monsterRoom", room: () => new Monster(playerObj), probability: 0.6 },
    { type: "healingRoom", room: () => new HealingRoom(playerObj), probability: 0.2 },
    { type: "treasureRoom", room: () => new TreasureRoom(playerObj), probability: 0.2 }
  ];

  // Check if the player hasn't encountered a healing room in the last few rooms.
  if (lastHealingRoom !== "healingRoom" && healingRoomCounter >= 3) {
    // Increase the probability of a healing room showing up.
    const newProb = rooms[1].probability * 2;
    rooms[1].probability = Math.min(newProb, 1);
  }

  // Calculate the total probability of all rooms.
  const totalProbability = rooms.reduce((acc, room) => acc + room.probability, 0);

  // Generate a random value between 0 and the total probability.
  let randomValue = Math.random() * totalProbability;

  // Loop through the rooms and subtract each room's probability from the random value until it reaches 0.
  for (let i = 0; i < rooms.length; i++) {
    randomValue -= rooms[i].probability;
    if (randomValue <= 0) {
      const selectedRoom = rooms[i].room();
      if (selectedRoom instanceof HealingRoom) {
        // Update the lastHealingRoom variable and reset the counter.
        lastHealingRoom = "healingRoom";
        healingRoomCounter = 0;
      } else {
        // Increment the healingRoomCounter.
        healingRoomCounter++;
      }
      return selectedRoom;
    }
  }
}

export default getNextRoom;
