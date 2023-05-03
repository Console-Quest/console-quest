const { Player, Enemy } = require('../gameplay/characters');

describe('Player', () => {
  test('constructor sets the name property to the given username', () => {
    const player = new Player(100, 'John', { name: 'Human', damage: 10, critChance: 0.1, critMulti: 2 });
    expect(player.name).toBe('John');
  });

  test('attackEnemy method calls the enemy takeDamage method with the calculated damage', () => {
    const enemy = new Enemy(100, 'Orc', 20);
    const player = new Player(100, 'John', { name: 'Human', damage: 10, critChance: 0.1, critMulti: 2 });
    enemy.takeDamage = jest.fn();
    player.attackEnemy(enemy);
    expect(enemy.takeDamage).toHaveBeenCalled();
  });

  test('checkForCrit method returns true if the random number is less than or equal to the base crit chance', () => {
    const species = { name: 'Human', damage: 10, critChance: 0.1, critMulti: 2 };
    const player = new Player(100, 'John', species);
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.05;
    global.Math = mockMath;
    expect(player.checkForCrit()).toBe(true);
  });

  test('checkForCrit method returns false if the random number is greater than the base crit chance', () => {
    const species = { name: 'Human', damage: 10, critChance: 0.1, critMulti: 2 };
    const player = new Player(100, 'John', species);
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.2;
    global.Math = mockMath;
    expect(player.checkForCrit()).toBe(false);
  });
});

describe('Enemy', () => {
  test('constructor sets the name property to the given name', () => {
    const enemy = new Enemy(100, 'Orc', 20);
    expect(enemy.name).toBe('Orc');
  });

  test('constructor sets the baseDmg property to the given base damage', () => {
    const enemy = new Enemy(100, 'Orc', 20);
    expect(enemy.baseDmg).toBe(20);
  });

  test('constructor sets the maxHp property to the given hit points', () => {
    const enemy = new Enemy(100, 'Orc', 20);
    expect(enemy.maxHp).toBe(100);
  });

  test('attack method calls the target takeDamage method with the base damage', () => {
    const target = new Enemy(100, 'Goblin', 10);
    const enemy = new Enemy(100, 'Orc', 20);
    target.takeDamage = jest.fn();
    enemy.attack(target);
    expect(target.takeDamage).toHaveBeenCalledWith(20);
  });

  test('checkForDead method returns true if the enemy hp is less than or equal to zero', () => {
    const enemy = new Enemy(0, 'Orc', 20);
    expect(enemy.checkForDead()).toBe(true);
  });

  test('checkForDead method returns false if the enemy hp is greater than zero', () => {
    const enemy = new Enemy(50, 'Orc', 20);
    expect(enemy.checkForDead()).toBe(false);
  });
});
