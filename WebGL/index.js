'use strict';

const vsSource = // This is the vertex shader source code
`#version 300 es

in vec3 aPosition;
in vec3 aColor;
out vec3 vColor;

uniform mat4 uTranslationMatrix;
uniform mat4 uRotationAboutXMatrix;
uniform mat4 uRotationAboutYMatrix;
uniform mat4 uRotationAboutZMatrix;
uniform mat4 uScaleMatrix;

void main()
{
    gl_Position = uTranslationMatrix * uRotationAboutZMatrix * uRotationAboutYMatrix * uRotationAboutXMatrix * uScaleMatrix * vec4(aPosition,  1.0);
    vColor = aColor;
}`;

const fsSource = // This is the fragment shader source code
`#version 300 es

precision lowp float;

in vec3 vColor;
out vec4 outColor;

void main() {
    outColor = vec4(vColor, 1.0);
}`;

let shaderProgram = MyGame.renderer.core.initShaderProgram(vsSource, fsSource);
let attributeLocations = {
    position: MyGame.renderer.core.getAttributeLocation(shaderProgram, 'aPosition'),
    color: MyGame.renderer.core.getAttributeLocation(shaderProgram, 'aColor')
};
let uniformLocations = {
    scale: MyGame.renderer.core.getUniformLocation(shaderProgram, 'uScaleMatrix'),
    rotationX: MyGame.renderer.core.getUniformLocation(shaderProgram, 'uRotationAboutXMatrix'),
    rotationY: MyGame.renderer.core.getUniformLocation(shaderProgram, 'uRotationAboutYMatrix'),
    rotationZ: MyGame.renderer.core.getUniformLocation(shaderProgram, 'uRotationAboutZMatrix'),
    translation: MyGame.renderer.core.getUniformLocation(shaderProgram, 'uTranslationMatrix')
};

MyGame.renderer.Tetrahedron.initialize(attributeLocations, uniformLocations);
MyGame.renderer.Cube.initialize(attributeLocations, uniformLocations);

let tetrahedrons = [];
let cubes = [];

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

// Get the start time
let lastTimeStamp = performance.now();

// processInput is responsible for handling user input
function processInput(elapsedTime) {

}

// update is responsible for updating the state of game objects (i.e. moving objects, object collision, etc.)
function update(elapsedTime) {
    for (let tetrahedronModel of tetrahedrons) { 
        tetrahedronModel.update(elapsedTime);
    }
    for (let cubeModel of cubes) { 
        cubeModel.update(elapsedTime);
    }
}

// render is responsible for drawing game objects on the screen
function render() {
    MyGame.renderer.core.clearBackground();

    for (let tetrahedronModel of tetrahedrons) {
        MyGame.renderer.Tetrahedron.render(tetrahedronModel);
    }
    for (let cubeModel of cubes) {
        MyGame.renderer.Cube.render(cubeModel);
    }
}

// This is the main game loop. It is what keeps your game running. It keeps track of elapsed time and has three phases
function gameLoop(time) {
    let elapsedTime = time - lastTimeStamp;
    lastTimeStamp = time;

    processInput(elapsedTime);
    update(elapsedTime);
    render();

    requestAnimationFrame(gameLoop); // this hands control back to the browser. When the browser finishes, it will call the function you pass in.
}

function initialize() {
    // This just starts the game loop
    requestAnimationFrame(gameLoop);
}

initialize();
