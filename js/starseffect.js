function StarsEffect(starsCount) {
    let velocity = [0.0, 0.0];

    this.stars = [];

    this.update = function(deltaTime) {
        this.stars.forEach(function(star) {
            star[0] += velocity[0] * star[2] * (deltaTime * 0.001);
            star[1] += velocity[1] * star[2] * (deltaTime * 0.001);

            if (star[0] < 0 || star[0] >= this.width || star[1] < 0 || star[1] >= this.height) {
                star[0] = Math.random() * this.width;
                star[1] = Math.random() * this.height;
                star[2] = Math.random();

                snap_with_direction(star, velocity, this.width, this.height);
            }
        }.bind(this));
    };

    this.render = function(context) {
        this.stars.forEach(function(star) {
            context.fillStyle = "#efefef";
            context.fillRect(star[0], star[1], star[2] * 5, star[2] * 5);
        });

        // TODO: extract distribution grid to a separate component

        let gridSize = 10;
        let stats = [];

        for (let i = 0; i < gridSize; ++i) {
            stats.push(0);
        }

        this.stars.forEach(function(star) {
            stats[Math.floor(star[2] / (1 / gridSize))]++;
        });

        function rgb(r, g, b) {
            r = Math.floor(r);
            g = Math.floor(g);
            b = Math.floor(b);
            return ["rgb(",r,",",g,",",b,")"].join("");
        }

        let barWidth = 20;
        let barMaxHeight = 200;

        // for (let i = 0; i < gridSize; ++i) {
        //     context.fillStyle = rgb(stats[i] / (starsCount / (gridSize / 2)) * 255, 200, 100);
        //     context.fillRect(i * barWidth, 0, barWidth, stats[i] / starsCount * barMaxHeight);
        // }
    };

    this.init = function(width, height) {
        this.width = width;
        this.height = height;

        for (let i = 0; i < starsCount; ++i) {
            this.stars.push([Math.random() * width, Math.random() * height, Math.random()]);
        }
    };

    this.onVelocityUpdated = function(newVelocity) {
        velocity = negative_vector(newVelocity);
    };

    this.onMouseMove = function(position) {
        velocity = [- (position[0] - this.width / 2), - (position[1] - this.height / 2)];
    };
}
