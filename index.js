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

function Ship(position, width, height) {

    this.position = position;

    this.render = function(context) {
    };

    this.update = function(deltaTime) {
    };  
}

function StarsEffect(starsCount, width, height) {
    const STAR_SPEED = 300.0;
    const DIRECTION = [-0.50, -1.0];

    this.stars = [];

    for (let i = 0; i < starsCount; ++i) {
        this.stars.push([Math.random() * width, Math.random() * height, Math.random()]);
    }

    this.update = function(deltaTime) {
        this.stars.forEach(function(star) {
            star[0] += DIRECTION[0] * STAR_SPEED * star[2] * (deltaTime * 0.001);
            star[1] += DIRECTION[1] * STAR_SPEED * star[2] * (deltaTime * 0.001);

            if (star[0] < 0 || star[0] >= width || star[1] < 0 || star[1] >= height) {
                star[0] = Math.random() * width;
                star[1] = Math.random() * height;
                star[2] = Math.random();

                snap_with_direction(star, DIRECTION, width, height);
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
