function Ship() {
    let heading = 0;
    let speed = [0, 0];

    this.render = function(context) {
        context.fillStyle = "#afefef";
        context.beginPath();
        context.moveTo(Math.cos(heading) * 40 + this.width / 2 + speed[0], 
                       Math.sin(heading) * 40 + this.height / 2 + speed[1]);
        context.lineTo(Math.cos(heading + Math.PI * 3 / 4) * 20 + this.width / 2 + speed[0],
                       Math.sin(heading + Math.PI * 3 / 4) * 20 + this.height / 2 + speed[1]);
        context.lineTo(Math.cos(heading - Math.PI * 3 / 4) * 20 + this.width / 2 + speed[0],
                       Math.sin(heading - Math.PI * 3 / 4) * 20 + this.height / 2 + speed[1]);
        context.fill();
    };

    this.update = function(deltaTime) {
    };  

    this.init = function(width, height) {
        this.width = width;
        this.height = height;
    };

    this.onMouseMove = function(position) {
        let direction = [position[0] - this.width / 2, 
                         position[1] - this.height / 2];
        heading = vector_angle(direction);
        speed = [direction[0] * 0.05, direction[1] * 0.05];

        console.log(speed);
    };
}
