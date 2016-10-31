function StarsEffect(starsCount) {
    let direction = [-0.50, -1.0];

    this.stars = [];

    this.update = function(deltaTime) {
        this.stars.forEach(function(star) {
            star[0] += direction[0] * star[2] * (deltaTime * 0.001);
            star[1] += direction[1] * star[2] * (deltaTime * 0.001);

            if (star[0] < 0 || star[0] >= this.width || star[1] < 0 || star[1] >= this.height) {
                star[0] = Math.random() * this.width;
                star[1] = Math.random() * this.height;
                star[2] = Math.random();

                snap_with_direction(star, direction, this.width, this.height);
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

    this.onMouseMove = function(position) {
        direction = [- (position[0] - this.width / 2), - (position[1] - this.height / 2)];
    };
}
