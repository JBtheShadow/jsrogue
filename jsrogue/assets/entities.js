// Player template
Game.PlayerTemplate = {
    name: 'Player',
    character: '@',
    foreground: 'white',
    maxHp: 40,
    attackValue: 10,
    sightRadius: 6,
    inventorySlots: 22,
    mixins: [Game.EntityMixins.PlayerActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.InventoryHolder, Game.EntityMixins.FoodConsumer,
             Game.EntityMixins.Sight, Game.EntityMixins.MessageRecipient,
             Game.EntityMixins.Equipper]
};

// Create our central entity repository
Game.EntityRepository = new Game.Repository('entities', Game.Entity);

// Fungus template
Game.EntityRepository.define('fungus', {
    name: 'fungus',
    character: 'F',
    foreground: 'green',
    maxHp: 10,
    mixins: [Game.EntityMixins.FungusActor, Game.EntityMixins.Destructible]
});

Game.EntityRepository.define('bat', {
    name: 'bat',
    character: 'B',
    foreground: 'white',
    maxHp: 5,
    attackValue: 4,
    mixins: [Game.EntityMixins.WanderActor, Game.EntityMixins.CorpseDropper, Game.EntityMixins.Attacker, Game.EntityMixins.Destructible]
});

Game.EntityRepository.define('newt', {
    name: 'newt',
    character: ':',
    foreground: 'lightgreen',
    maxHp: 3,
    attackValue: 2,
    mixins: [Game.EntityMixins.WanderActor, Game.EntityMixins.CorpseDropper, Game.EntityMixins.Attacker, Game.EntityMixins.Destructible]
});