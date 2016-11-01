function GameConsole(documentId) {
    const deltaTime = 33;

    let canvas = document.getElementById(documentId);
    let context = canvas.getContext("2d");

    // TODO: detect window resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let entities = [];
    let mouseMoveListeners = [];

    canvas.addEventListener('mousemove', function(evt) {
        let rect = canvas.getBoundingClientRect();
        let position = [evt.clientX - rect.left, evt.clientY - rect.top];
        mouseMoveListeners.forEach(function(listener) {
            listener.onMouseMove(position);
        });
    });

    function clearView() {
        context.fillStyle = "#151515";
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
        entity.init(canvas.width, canvas.height);
        entities.push(entity);
    };

    this.addMouseMoveListener = function(listener) {
        mouseMoveListeners.push(listener);
    };
}
