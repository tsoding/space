function is_pos(x) {
    return x > 0;
}

function is_neg(x) {
    return x < 0;
}

function is_zero(x) {
    return x === 0;
}

function snap_with_direction(point, direction, width, height) {
    // TODO: try to implement axis snapping without tables
    const snappers =
              [or(snap_axis(0, 0), snap_axis(1, 0)),
               or(snap_axis(0, width), snap_axis(1, 0)),
               or(snap_axis(0, width), snap_axis(1, height)),
               or(snap_axis(0, 0), snap_axis(1, height)),

               snap_axis(0, 0),
               snap_axis(1, 0),
               snap_axis(0, width),
               snap_axis(1, height),

               nothing()];
    snappers[kind_of_vector(direction)](point);
}

function kind_of_vector(vector) {
    return [[is_pos, is_pos],   // quadrants
            [is_neg, is_pos],
            [is_neg, is_neg],
            [is_pos, is_neg],

            [is_pos, is_zero],  // axis
            [is_zero, is_pos],
            [is_neg, is_zero],
            [is_zero, is_neg],

            [is_zero, is_zero]] // special case
        .findIndex(function(predicate) {
            return predicate[0](vector[0]) && predicate[1](vector[1]);
        });
}

function snap_axis(axis, value) {
    return function(point) {
        point[axis] = value;
    };
}

function or(f1, f2) {
    return function(x) {
        if (Math.random() * 2 < 1) {
            f1(x);
        } else {
            f2(x);
        }
    };
}

function nothing() {
    return function(x) {};
}

function Ship() {

    this.render = function(context) {
    };

    this.update = function(deltaTime) {
    };  

    this.init = function(width, height) {
    };
}

function StarsEffect(starsCount) {
    const STAR_SPEED = 300.0;
    // TODO: change direction with mouse
    // http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
    const DIRECTION = [-0.50, -1.0];

    this.stars = [];

    this.update = function(deltaTime) {
        this.stars.forEach(function(star) {
            star[0] += DIRECTION[0] * STAR_SPEED * star[2] * (deltaTime * 0.001);
            star[1] += DIRECTION[1] * STAR_SPEED * star[2] * (deltaTime * 0.001);

            if (star[0] < 0 || star[0] >= this.width || star[1] < 0 || star[1] >= this.height) {
                star[0] = Math.random() * this.width;
                star[1] = Math.random() * this.height;
                star[2] = Math.random();

                snap_with_direction(star, DIRECTION, this.width, this.height);
            }
        }.bind(this));
    };

    this.render = function(context) {
        this.stars.forEach(function(star) {
            context.fillStyle = "#efefef";
            context.fillRect(star[0], star[1], star[2] * 5, star[2] * 5);
        });
    };

    this.init = function(width, height) {
        this.width = width;
        this.height = height;

        for (let i = 0; i < starsCount; ++i) {
            this.stars.push([Math.random() * width, Math.random() * height, Math.random()]);
        }
    };
} 

function GameConsole(documentId) {
    const deltaTime = 33;

    let canvas = document.getElementById(documentId);
    let context = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;

    let entities = [];

    function clearView() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        entities.forEach(function(entity) {
            entity.update(deltaTime);
        });
    }

    function render() {
        clearView();
        entities.forEach(function(entity) {
            entity.render(context);
        });
    }

    function eventLoop() {
        update();
        render();
        setTimeout(eventLoop, deltaTime);
    }

    this.start = function() {
        setTimeout(eventLoop, deltaTime);
    };

    this.addEntity = function(entity) {
        entity.init(width, height);
        entities.push(entity);
    };
}

(function() {
    let gameConsole = new GameConsole("space");

    gameConsole.addEntity(new StarsEffect(500));
    gameConsole.addEntity(new Ship());

    gameConsole.start();
})();
