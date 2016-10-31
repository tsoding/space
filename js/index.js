(function() {
    let gameConsole = new GameConsole("space");
    let stars = new StarsEffect(500);

    gameConsole.addEntity(stars);
    gameConsole.addEntity(new Ship());
    
    gameConsole.addMouseMoveListener(stars);

    gameConsole.start();
})();
