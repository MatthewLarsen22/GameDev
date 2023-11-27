MyGame.main = (function(renderer, components, model) {
    'use strict';
    let lastTimeStamp = performance.now();

    function processInput(elapsedTime) {
        model.processInput(elapsedTime);
    }

    function update(elapsedTime) {
        model.update(elapsedTime);
    }

    function render(elapsedTime) {
        renderer.core.clearBackground();
        model.render(renderer);
    }

    function gameLoop(time) {
        let elapsedTime = (time - lastTimeStamp);
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render(elapsedTime);

        requestAnimationFrame(gameLoop);
    }

    function initialize() {
        MyGame.renderer.Tetrahedron.initialize(MyGame.renderer.SimpleShader);
        MyGame.renderer.Cube.initialize(MyGame.renderer.SimpleShader);
        MyGame.renderer.TexturedCube.initialize(MyGame.renderer.TextureShader);

        model.initialize();
        
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize: initialize
    };

}(MyGame.renderer, MyGame.components, MyGame.model));