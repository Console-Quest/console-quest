// randomly generates a room from pool of possible rooms

import healingRoom from "./healingRoom";
import monsterRoom from "./monsterRoom";
import treasureRoom from "./treasureRoom";
import combat from "./combat";
import player from "../playLoop";

let lastHealingRoom = null;
let healingRoomCounter = 0;
const rooms = [
  { type: "monsterRoom", room: monsterRoom, probability: 0.6 },
  { type: "healingRoom", room: healingRoom, probability: 0.2 },
  { type: "treasureRoom", room: treasureRoom, probability: 0.2 },
];

class RoomChoice {
  constructor(player) {
    this.player = player;
  }

  handleNewRoom() {
    let result;
    let curRoom = getRandomRoom();
    switch (curRoom.type) {
      case "monsterRoom":
        console.log("Uh-oh, what was that...");
        let monster = monsterRoom(this.player);
        console.log(`Hark! ${monster.description}`);
        result = combat(this.player, monster);
        player = result;
        break;
      case "healingRoom":
        result = healingRoom(this.player);
        this.player = result;
        break;
      case "treasureRoom":
        result = treasureRoom(this.player);
        this.player = result;
        break;
    }
    return this.player;
  }
}

const getRandomRoom = () => {
  // Check if the player hasn't encountered a healing room in the last few rooms.
  if (lastHealingRoom !== "healingRoom" && healingRoomCounter >= 3) {
    // Increase the probability of a healing room showing up.
    const newProb = rooms[1].probability * 2;
    rooms[1].probability = Math.min(newProb, 1);
  }

  // Calculate the total probability of all rooms.
  const totalProbability = rooms.reduce(
    (acc, room) => acc + room.probability,
    0
  );

  // Generate a random value between 0 and the total probability.
  let randomValue = Math.random() * totalProbability;

  // Loop through the rooms and subtract each room's probability from the random value until it reaches 0.
  let chosenRoom;
  for (let i = 0; i < rooms.length; i++) {
    randomValue -= rooms[i].probability;
    if (randomValue <= 0) {
      const selectedRoom =
        rooms[i].type === "healingRoom" ? "healingRoom" : rooms[i].room;
      if (selectedRoom === "healingRoom") {
        // Update the lastHealingRoom variable and reset the counter.
        lastHealingRoom = "healingRoom";
        healingRoomCounter = 0;
      } else {
        // Increment the healingRoomCounter.
        healingRoomCounter++;
      }
      chosenRoom = selectedRoom;
    }
  }
  return chosenRoom;
}

module.exports = RoomChoice;
