function Ship(position, width, height) {

    this.position = position;

    this.render = function(context) {
    };

    this.update = function(deltaTime) {
    };  
}

function StarsEffect(starsCount, width, height) {
    const STAR_SPEED = 300.0;
    const DIRECTION = [-1, 0];

    this.stars = [];

    for (let i = 0; i < starsCount; ++i) {
        this.stars.push([Math.random() * width, Math.random() * height, Math.random()]);
    }

    this.update = function(deltaTime) {
        this.stars.forEach(function(star) {
            star[0] += DIRECTION[0] * STAR_SPEED * star[2] * (deltaTime * 0.001);
            star[1] += DIRECTION[1] * STAR_SPEED * star[2] * (deltaTime * 0.001);

            if (star[0] < 0 || star[0] >= width || star[1] < 0 || star[1] >= height) {
                // TODO: regenerate star according to the DIRECTION
                star[0] = width;
                star[1] = Math.random() * height;
                star[2] = Math.random();
            }
        });
    };

    this.render = function(context) {
        this.stars.forEach(function(star) {
            context.fillStyle = "#efefef";
            context.fillRect(star[0], star[1], star[2] * 5, star[2] * 5);
        });
    };
} 

(function() {
    let canvas = document.getElementById("space");
    let context = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;

    let starsEffect = new StarsEffect(150, width, height);
    let ship = new Ship(height / 2, width, height);
    let deltaTime = 33;
    
    function clearView() {
        context.fillStyle = "black";
        context.fillRect(0, 0, width, height);
    }

    function update() {
        starsEffect.update(deltaTime);
        ship.update(deltaTime);
    }

    function render() {
        clearView();
        starsEffect.render(context);
        ship.render(context);
    }

    function eventLoop() {
        update();
        render();
        setTimeout(eventLoop, deltaTime);
    }
    setTimeout(eventLoop, deltaTime);

})();
