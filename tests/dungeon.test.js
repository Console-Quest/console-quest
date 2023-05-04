const { Dungeon } = require('../gameplay/dungeon.js');

describe('Dungeon', () => {
  let dungeon;
  let player;

  beforeEach(() => {
    dungeon = new Dungeon();
  });

  test('levelUp method should increase the dungeon level by 1', () => {
    const initialLevel = dungeon.level;
    dungeon.levelUp();
    expect(dungeon.level).toBe(initialLevel + 1);
  });  
});