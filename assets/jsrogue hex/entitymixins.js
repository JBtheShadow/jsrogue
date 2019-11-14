Game.EntityMixins.Sight.canSee = function (entity) {
    // If not on the same map or on different floors, then exit early
    if (!entity || this._map !== entity.getMap() || this._z !== entity.getZ()) {
        return false;
    }

    var otherX = entity.getX();
    var otherY = entity.getY();

    //// If we're not in a square field of view, then we won't be in a real
    //// field of view either.
    //if ((otherX - this._x) * (otherX - this._x) * 2 +
    //    (otherY - this._y) * (otherY - this._y) >
    //    this._sightRadius * this._sightRadius * 2) {
    //    return false;
    //}

    // Compute the FOV and check if the coordinates are in there.
    var found = false;
    this.getMap().getFov(this.getZ()).compute(
        this.getX(), this.getY(),
        this.getSightRadius(),
        function (x, y, radius, visibility) {
            if (x === otherX && y === otherY) {
                found = true;
            }
        });
    return found;
};

Game.EntityMixins.FungusActor.init = function () {
    this._growthsRemaining = 4;
};

Game.EntityMixins.FungusActor.act = function () {
    // Check if we are going to try growing this turn
    if (this._growthsRemaining > 0) {
        if (Math.random() <= 0.02) {
            // Generate the coordinates of a random adjacent square by
            // generating an offset between [-1, 0, 1] for both the x and
            // y directions. To do this, we generate a number from 0-2 and then
            // subtract 1.
            var xOffset = Math.floor(Math.random() * 5) - 2;
            var yOffset = Math.floor(Math.random() * 3) - 1;

            if ((Math.abs(xOffset) + Math.abs(yOffset)) % 2 !== 0) {
                var offsets = ROT.DIRS[4][Math.floor(Math.random() * 4)];
                xOffset += offsets[0];
                yOffset += offsets[1];
            }

            // Make sure we aren't trying to spawn on the same tile as us
            if ((xOffset !== 0 || yOffset !== 0) &&
                (Math.abs(xOffset) + Math.abs(yOffset)) % 2 === 0) {
                // Check if we can actually spawn at that location, and if so
                // then we grow!
                if (this.getMap().isEmptyFloor(this.getX() + xOffset,
                    this.getY() + yOffset,
                    this.getZ())) {
                    var entity = Game.EntityRepository.create("fungus");
                    var level = Math.floor(Math.random() * this.getLevel() - 1);
                    for (var i = 0; i < level; i++) {
                        entity.giveExperience(entity.getNextLevelExperience() - entity.getExperience());
                    }
                    entity.setPosition(this.getX() + xOffset, this.getY() + yOffset, this.getZ());
                    this.getMap().addEntity(entity);
                    this._growthsRemaining--;
                    // Send a message nearby!
                    Game.sendMessageNearby(this.getMap(),
                        entity.getX(), entity.getY(), entity.getZ(),
                        'The fungus is spreading!');
                }
            }
        }
    }
};

Game.EntityMixins.TaskActor.hunt = function () {
    var player = this.getMap().getPlayer();

    // If we are adjacent to the player, then attack instead of hunting.
    var offsets = Math.abs(player.getX() - this.getX()) +
        Math.abs(player.getY() - this.getY());
    if (offsets === 2) {
        if (this.hasMixin('Attacker')) {
            this.attack(player);
            return;
        }
    }

    // Generate the path and move to the first tile.
    var source = this;
    var z = source.getZ();
    var path = new ROT.Path.AStar(player.getX(), player.getY(), function (x, y) {
        // If an entity is present at the tile, can't move there.
        var entity = source.getMap().getEntityAt(x, y, z);
        if (entity && entity !== player && entity !== source) {
            return false;
        }
        return source.getMap().getTile(x, y, z).isWalkable();
    }, { topology: 6 });
    // Once we've gotten the path, we want to move to the second cell that is
    // passed in the callback (the first is the entity's starting point)
    var count = 0;
    path.compute(source.getX(), source.getY(), function (x, y) {
        if (count === 1) {
            source.tryMove(x, y, z);
        }
        count++;
    });
};
Game.EntityMixins.TaskActor.wander = function () {
    var offsets = ROT.DIRS[6][Math.floor(Math.random() * 6)];
    this.tryMove(this.getX() + offsets[0], this.getY() + offsets[1], this.getZ());
};

Game.EntityMixins.GiantZombieActor = Game.extend(Game.EntityMixins.TaskActor, {
    init: function (template) {
        // Call the task actor init with the right tasks.
        Game.EntityMixins.TaskActor.init.call(this, Game.extend(template, {
            'tasks': ['growArm', 'spawnSlime', 'hunt', 'wander']
        }));
        // We only want to grow the arm once.
        this._hasGrownArm = false;
    },
    canDoTask: function (task) {
        // If we haven't already grown arm and HP <= 20, then we can grow.
        if (task === 'growArm') {
            return this.getHp() <= 20 && !this._hasGrownArm;
            // Spawn a slime only a 10% of turns.
        } else if (task === 'spawnSlime') {
            return Math.round(Math.random() * 100) <= 10;
            // Call parent canDoTask
        } else {
            return Game.EntityMixins.TaskActor.canDoTask.call(this, task);
        }
    },
    growArm: function () {
        this._hasGrownArm = true;
        this.increaseAttackValue(5);
        // Send a message saying the zombie grew an arm.
        Game.sendMessageNearby(this.getMap(),
            this.getX(), this.getY(), this.getZ(),
            'An extra arm appears on the giant zombie!');
    },
    spawnSlime: function () {
        // Generate a random position nearby.
        var xOffset = Math.floor(Math.random() * 3) - 1;
        var yOffset = Math.floor(Math.random() * 5) - 2;

        if ((Math.abs(xOffset) + Math.abs(yOffset)) % 2 !== 0) {
            var offsets = ROT.DIRS[4][Math.floor(Math.random() * 4)];
            xOffset += offsets[0];
            yOffset += offsets[1];
        }

        // Check if we can spawn an entity at that position.
        if (!this.getMap().isEmptyFloor(this.getX() + xOffset, this.getY() + yOffset,
            this.getZ())) {
            // If we cant, do nothing
            return;
        }
        // Create the entity
        var slime = Game.EntityRepository.create('slime');
        slime.setX(this.getX() + xOffset);
        slime.setY(this.getY() + yOffset);
        slime.setZ(this.getZ());
        this.getMap().addEntity(slime);
    },
    listeners: {
        onDeath: function (attacker) {
            // Switch to win screen when killed!
            Game.switchScreen(Game.Screen.winScreen);
        }
    }
});