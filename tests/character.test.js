const { Player, Enemy } = require('../gameplay/characters');

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player(100, 'John', 'human');
  });

  describe('constructor', () => {
    it('should set the player name and race', () => {
      expect(player.name).toEqual('John');
      expect(player.race).toEqual('human');
    });

    it('should set the player hit points and max hit points', () => {
      expect(player.hp).toEqual(100);
      expect(player.maxHp).toEqual(100);
    });

    it('should set the player base damage, crit chance, and crit multiplier', () => {
      expect(player.baseDmg).toEqual(10);
      expect(player.baseCritChance).toEqual(0.1);
      expect(player.baseCritMulti).toEqual(1.5);
    });
  });

  describe('checkForCrit', () => {
    it('should return true if the random number is less than or equal to the base crit chance', () => {
      // Force the random number to be less than the base crit chance
      Math.random = jest.fn(() => 0.05);

      expect(player.checkForCrit()).toEqual(true);
    });

    it('should return false if the random number is greater than the base crit chance', () => {
      // Force the random number to be greater than the base crit chance
      Math.random = jest.fn(() => 0.15);

      expect(player.checkForCrit()).toEqual(false);
    });
  });

  describe('attackEnemy', () => {
    let enemy;

    beforeEach(() => {
      enemy = { takeDamage: jest.fn() };
    });

    it('should call the enemy takeDamage method with the calculated damage', () => {
      // Force the crit multiplier to be used
      player.checkForCrit = jest.fn(() => true);

      player.attackEnemy(enemy);

      // Expect the enemy's takeDamage method to be called with the calculated damage
      expect(enemy.takeDamage).toHaveBeenCalledWith(15);
    });

    it('should call the enemy takeDamage method with the rounded up damage', () => {
      // Force the damage to be a decimal number
      player.baseDmg = 6;

      player.attackEnemy(enemy);

      // Expect the enemy's takeDamage method to be called with the rounded up damage
      expect(enemy.takeDamage).toHaveBeenCalledWith(6);
    });
  });

  describe('takeDamage', () => {
    it('should reduce the player hit points by the given amount of damage', () => {
      player.takeDamage(20);

      expect(player.hp).toEqual(80);
    });
  });


});

describe('Enemy', () => {
  let enemy;

  beforeEach(() => {
    enemy = new Enemy(50, 'Goblin', 8);
  });

  it('should have correct initial properties', () => {
    expect(enemy.hp).toEqual(50);
    expect(enemy.maxHp).toEqual(50);
    expect(enemy.name).toEqual('Goblin');
    expect(enemy.baseDmg).toEqual(8);
  });

  it('should reduce the target player\'s hit points by its base damage when attacking', () => {
    const player = { hp: 30, takeDamage: jest.fn() };
    enemy.attackEnemy(player);
    expect(player.takeDamage).toHaveBeenCalledWith(enemy.baseDmg);
  });

  it('should reduce its hit points by the given amount of damage when taking damage', () => {
    enemy.takeDamage(20);
    expect(enemy.hp).toEqual(30);
  });

});