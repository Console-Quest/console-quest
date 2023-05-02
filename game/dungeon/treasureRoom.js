class TreasureRoom {
    constructor(playerObj) {
      this.type = "treasureRoom";
      this.name = "Treasure Room";
      this.probability = 30;
      this.boosts = ["health", "damage"];
      this.item = this.getRandomItem(playerObj.currentLevel);
    }
  
    getRandomItem(level) {
      // Get a random boost type and calculate the amount of the boost based on the player's level.
      const boostType = this.boosts[Math.floor(Math.random() * this.boosts.length)];
      let boostAmount;
      if (boostType === "health") {
        boostAmount = Math.ceil(level * 2.5);
      } else {
        boostAmount = Math.ceil(level * 1.5);
      }
  
      return { type: boostType, amount: boostAmount };
    }
  
    collectItem(playerObj) {
      // Apply the boost to the player's stats.
      if (this.item.type === "health") {
        playerObj.health += this.item.amount;
        console.log("You found a health boost and recovered " + this.item.amount + " health. You now have " + playerObj.health + " health.");
      } else {
        playerObj.minDamage += this.item.amount;
        playerObj.maxDamage += this.item.amount;
        console.log("You found a damage boost and increased your minimum and maximum damage by " + this.item.amount + ".");
      }
  
      return playerObj;
    }
  }
  