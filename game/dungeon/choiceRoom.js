// randomly generates a room from pool of possible rooms -> each room populates itself via component
'use strict';

import healingRoom from './healingRoom';
import monsterRoom from './monsterRoom';
import treasureRoom from './treasureRoom';

let lastHealingRoom = null;
let healingRoomCounter = 0;

function getNextRoom() {
  // Define an array of rooms with corresponding probabilities.
  const rooms = [
    { type: "monsterRoom", room: monsterRoom, probability: 0.6 },
    { type: "healingRoom", room: healingRoom, probability: 0.2 },
    { type: "treasureRoom", room: treasureRoom, probability: 0.2 }
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
      const selectedRoom = rooms[i].type === "healingRoom" ? "healingRoom" : rooms[i].room;
      if (selectedRoom === "healingRoom") {
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
