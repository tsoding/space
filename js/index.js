(function() {
    let gameConsole = new GameConsole("space");

    gameConsole.addEntity(new StarsEffect(500));
    gameConsole.addEntity(new Ship());

    gameConsole.start();
})();
