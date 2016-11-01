(function() {
    let gameConsole = new GameConsole("space");
    let stars = new StarsEffect(500);
    let ship = new Ship();

    gameConsole.addEntity(stars);
    gameConsole.addEntity(ship);
    
    gameConsole.addMouseMoveListener(stars);
    gameConsole.addMouseMoveListener(ship);

    gameConsole.start();
})();
