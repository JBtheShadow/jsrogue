Game.Screen.playScreen.enter = function () {
    // Create a map based on our size parameters
    var width = 100;
    var height = 48;
    var depth = 6;
    Game.playMusic("cave");
    // Create our map from the tiles and player
    this._player = new Game.Entity(Game.PlayerTemplate);
    var tiles = new Game.Builder(width, height, depth).getTiles();
    var map = new Game.Map.Cave(width, height, depth, tiles, this._player);
    // Start the map's engine
    map.getEngine().start();
};

Game.playMusic = function (music) {
    if (Game._audio) {
        Game._audio.pause()
    }
    if (music) {
        Game._audio = document.querySelector("[data-audio='" + music + "']");
        if (Game._audio) {
            Game._audio.loop = true;
            Game._audio.play();
        }
    }
};

Game.Screen.playScreen.setGameEnded = function (gameEnded) {
    if (gameEnded) {
        Game.playMusic(null);
    }
    this._gameEnded = gameEnded;
};

Game.Screen.playScreen.getMovementDirection = function (keyCode) {
    //if (keyCode === ROT.KEYS.VK_LESS_THAN) {
    //    return [0, 0, -1];
    //}
    //if (keyCode === ROT.KEYS.VK_GREATER_THAN) {
    //    return [0, 0, 1];
    //}

    var keyMap = {};
    keyMap[ROT.KEYS.VK_HOME] = keyMap[ROT.KEYS.VK_NUMPAD7] = 0;
    keyMap[ROT.KEYS.VK_PAGE_UP] = keyMap[ROT.KEYS.VK_NUMPAD9] = 1;
    keyMap[ROT.KEYS.VK_RIGHT] = keyMap[ROT.KEYS.VK_NUMPAD6] = 2;
    keyMap[ROT.KEYS.VK_PAGE_DOWN] = keyMap[ROT.KEYS.VK_NUMPAD3] = 3;
    keyMap[ROT.KEYS.VK_END] = keyMap[ROT.KEYS.VK_NUMPAD1] = 4;
    keyMap[ROT.KEYS.VK_LEFT] = keyMap[ROT.KEYS.VK_NUMPAD4] = 5;

    if (!(keyCode in keyMap)) { return; }

    var diff = ROT.DIRS[6][keyMap[keyCode]];
    return [...diff, 0];
};

Game.Screen.winScreen.enter = function () {
    Game.playMusic("win");
    console.log("Entered win screen.");
};

Game.Screen.loseScreen.enter = function () {
    Game.playMusic(null);
    console.log("Entered lose screen.");
};