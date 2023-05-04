// import player from './choiceRoom';

class HealingRoom {
    constructor(player) {
        this.player = player;
    }

    heal() {
        let healed = (this.player.maxHealh - this.player.curHealth) / 2;
        this.player.curHealth += healed;
        console.log(`You found a healing fountain! You gained ${healed} Health! Current Health: ${this.player.curHealth}`);
        return this.player;
    }
}

module.exports = HealingRoom;