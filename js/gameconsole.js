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
