// generate instance of healing room
class HealingRoom {
  constructor() {
    this.type = "healingRoom";
    this.name = "Healing Room";
    this.probability = 20;
  }

  healPlayer(playerObj) {
    // Calculate the amount to heal based on the player's current and max health.
    const missingHealth = playerObj.maxHealth - playerObj.health;
    const healAmount = Math.ceil(missingHealth / 2);

    // Heal the player and print a message.
    playerObj.health += healAmount;
    console.log("You found a healing room and recovered " + healAmount + " health. You now have " + playerObj.health + " health.");

    // Return the updated player object.
    return playerObj;
  }
}

export default HealingRoom;
