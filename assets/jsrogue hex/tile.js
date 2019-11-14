// Helper function
Game.getNeighborPositions = function (x, y) {
    var tiles = [];
    // Generate all possible offsets
    for (var dX = -2; dX <= 2; dX++) {
        for (var dY = -1; dY < 2; dY++) {
            // Make sure it isn't the same tile
            if (dX === 0 && dY === 0) {
                continue;
            }
            // Also make sure it's a valid hex tile
            if ((Math.abs(dX) + Math.abs(dY)) % 2 !== 0) {
                continue;
            }
            tiles.push({ x: x + dX, y: y + dY });
        }
    }
    return tiles.randomize();
};
