MyGame.model = (function(input, components, renderer) {
    'use strict';
    let that = {};

    that.initialize = function() {
        console.log("Initializing Game Model");
    };
    
    that.processInput = function(elapsedTime) {
        console.log("Processing Game Model Input");
    };

    that.update = function(elapsedTime) {
        console.log("Updating Game Model");
    };

    that.render = function() {
        console.log("Rendering Game Model");
    };

    return that;
}(MyGame.input, MyGame.components, MyGame.renderer));