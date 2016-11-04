function Ship() {
    let heading = 0;
    let speed = [0, 0];
    let velocityListeners = [];

    const WING_SHIFT = Math.PI * 3 / 4;

    this.render = function(context) {
        const speedShift = magnify_vector(speed, 0.05);
        const tip = vector_sum(vector_sum(magnify_vector(angle_to_vector(heading), 40), this.screenCenter), speedShift);
        const leftWing = vector_sum(vector_sum(magnify_vector(angle_to_vector(heading + WING_SHIFT), 20), this.screenCenter), speedShift);
        const rightWing = vector_sum(vector_sum(magnify_vector(angle_to_vector(heading - WING_SHIFT), 20), this.screenCenter), speedShift);

        context.fillStyle = "#afefef";
        context.beginPath();
        context.moveTo(tip[0], tip[1]);
        context.lineTo(leftWing[0], leftWing[1]);
        context.lineTo(rightWing[0], rightWing[1]);
        context.fill();
    };

    this.update = function(deltaTime) {
    };  

    this.init = function(width, height) {
        this.width = width;
        this.height = height;
        this.screenCenter = [this.width / 2, this.height / 2];
    };

    this.onMouseMove = function(position) {
        let direction = [position[0] - this.width / 2, 
                         position[1] - this.height / 2];
        heading = vector_angle(direction);
        speed = [direction[0], direction[1]];

        velocityListeners.forEach(function(listener) {
            listener.onVelocityUpdated(speed);
        });
    };

    this.bindToVelocity = function(listener) {
        velocityListeners.push(listener);
    };
}
