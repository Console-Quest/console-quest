const { Dungeon } = require('../gameplay/dungeon.js');
const { Player } = require('../gameplay/characters');

describe('Dungeon', () => {
  let dungeon;
  let player;

  beforeEach(() => {
    dungeon = new Dungeon();
    player = new Player(100, 'Alice', { name: 'Human', damage: 10, critChance: 0.2, critMulti: 2 });
  });

  test('levelUp method should increase the dungeon level by 1', () => {
    const initialLevel = dungeon.level;
    dungeon.levelUp();
    expect(dungeon.level).toBe(initialLevel + 1);
  });

  test('createNewRoom method should return a new room', () => {
    const room = dungeon.createNewRoom();
    expect(room).toBeDefined();
  });

  test('createNewRoom method should return a healing room when the probability is less than the healing room chance', () => {
    dungeon.healingRoomChance = 1;
    dungeon.monsterRoomChance = 0;
    const room = dungeon.createNewRoom();
    expect(room.roomType).toBe('healing');
  });

  test('createNewRoom method should return a monster room when the probability is less than the monster room chance', () => {
    dungeon.healingRoomChance = 0;
    dungeon.monsterRoomChance = 1;
    const room = dungeon.createNewRoom();
    expect(room.roomType).toBe('monster');
  });


  test('createNewRoom method should update the healing room and monster room chances', () => {
    const initialHealingRoomChance = dungeon.healingRoomChance;
    const initialMonsterRoomChance = dungeon.monsterRoomChance;
    dungeon.createNewRoom();
    expect(dungeon.healingRoomChance).not.toBe(initialHealingRoomChance);
    expect(dungeon.monsterRoomChance).not.toBe(initialMonsterRoomChance);
  });
});