(function() {
    let gameConsole = new GameConsole("space");
    let stars = new StarsEffect(500);
    let ship = new Ship();

    ship.bindToVelocity(stars);

    gameConsole.addEntity(stars);
    gameConsole.addEntity(ship);

    gameConsole.addMouseMoveListener(ship);

    gameConsole.start();
})();
