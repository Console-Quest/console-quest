const { Rooms } = require("../gameplay/rooms");
const { Player } = require("../gameplay/characters");

describe("Rooms class", () => {
  describe("createMonster method", () => {
    it("should create a monster object with valid properties", () => {
      const room = new Rooms("monster", 1);
      const monster = room.createMonster();
      expect(monster).toHaveProperty("hp");
      expect(monster).toHaveProperty("name");
      expect(monster).toHaveProperty("dmg");
      expect(monster).toHaveProperty("description");
    });
  });

  describe("useAbility method", () => {
    it("should restore player's health if the room type is healing", async () => {
      const player = new Player("test", 10, 5, 0.1, 0);
      player.hp = 5;
      const room = new Rooms("healing", 1);
      await room.useAbility(player, { emit: jest.fn() });
      expect(player.hp).toBeGreaterThan(5);
    });

    it("should apply a random buff to the player if the room type is treasure", async () => {
      const player = new Player("test", 10, 5, 0.1, 0);
      const room = new Rooms("treasure", 1);
      await room.useAbility(player, { emit: jest.fn() });
      expect(player.maxHp).toBeGreaterThan(10);
      expect(player.baseDmg).toBeGreaterThan(5);
      expect(player.critChance).toBeGreaterThan(0.1);
    });

  });
});
