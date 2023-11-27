MyGame.model = (function(input, components, renderer) {
    'use strict';
    let that = {};
    let tetrahedrons = [];
    let cubes = [];

    that.initialize = function() {
        console.log("Initializing Game Model");

        for (let i = 0; i < 5; i++) {
            let size = Math.max(Math.random()/5, 1/32);
            let tetrahedronModel = MyGame.components.Tetrahedron(
                {
                    center: {
                        x: 0.4 * (i % 5) - 0.8,
                        y: -0.5,
                        z: 0
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    scale: {
                        x: size, // width
                        y: size, // height
                        z: size // depth
                    },
                    speed: 1/(100 * size * size)
                }
            );

            tetrahedrons.push(tetrahedronModel);
        }

        for (let i = 0; i < 5; i++) {
            let size = Math.max(Math.random()/5, 1/32);
            let cubeModel = MyGame.components.Cube(
                {
                    center: {
                        x: 0.4 * (i % 5) - 0.8,
                        y: 0.5,
                        z: 0
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    scale: {
                        x: size, // width
                        y: size, // height
                        z: size // depth
                    },
                    speed: 1/(100 * size * size)
                }
            );

            cubes.push(cubeModel);
        }
    };
    
    that.processInput = function(elapsedTime) {
        console.log("Processing Game Model Input");
    };

    that.update = function(elapsedTime) {
        console.log("Updating Game Model");

        for (let tetrahedronModel of tetrahedrons) { 
            tetrahedronModel.update(elapsedTime);
        }
        for (let cubeModel of cubes) { 
            cubeModel.update(elapsedTime);
        }
    };

    that.render = function() {
        console.log("Rendering Game Model");

        for (let tetrahedronModel of tetrahedrons) {
            MyGame.renderer.Tetrahedron.render(tetrahedronModel);
        }
        for (let cubeModel of cubes) {
            MyGame.renderer.TexturedCube.render(cubeModel);
        }
    };

    return that;
}(MyGame.input, MyGame.components, MyGame.renderer));