const { Rooms } = require('../gameplay/rooms');
const { Player, Enemy } = require('../gameplay/characters');

describe('Rooms', () => {
  let player;
  let room;
  let enemy;

  beforeEach(() => {
    player = new Player(100, 'John', {
      name: 'Human',
      damage: 10,
      critChance: 0.1,
      critMulti: 2,
    });
    room = new Rooms('treasure', 'damage');
    enemy = new Enemy(50, 'Orc', 10);
  });

  describe('useAbility', () => {
    test('healing room should restore half of the missing health to the player', () => {
      const room = new Rooms('healing', 'restore health');
      player.takeDamage(20);
      const initialHp = player.hp;
      room.useAbility(player);
      expect(player.hp).toBe(initialHp + Math.floor((player.maxHp - initialHp) / 2));
    });

    test('treasure room should increase player base damage by 50%', () => {
      const room = new Rooms('treasure', 'buff damage');
      const initialDamage = player.baseDmg;
      room.useAbility(player);
      expect(player.baseDmg).toBe(initialDamage * 1.5);
    });

    test('monster room should create a new enemy and have it fight the player', () => {
      const room = new Rooms('monster', 'spawn enemy');
      const initialHp = player.hp;
      room.useAbility(player);
      expect(player.hp).not.toBe(initialHp);
    });
  });
});
