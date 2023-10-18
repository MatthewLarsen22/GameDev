// Grab the canvas element and tell it to use a 2d context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let inputBuffer = {};

// Get the start time
let lastTimeStamp = performance.now();

// This is a rectangle model to be displayed on the screen
let rect = {
    vel_x: 3/8,
    vel_y: 3/8,
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    color: "red"
}

// processInput is responsible for handling user input
function processInput(elapsedTime) {
    for (let input in inputBuffer) {
        if (input === 'w') {
            rect.y -= rect.vel_y * elapsedTime;
        }
        if (input === 'a') {
            rect.x -= rect.vel_x * elapsedTime;
        }
        if (input === 's') {
            rect.y += rect.vel_y * elapsedTime;
        }
        if (input === 'd') {
            rect.x += rect.vel_x * elapsedTime;
        }
    }
}

// update is responsible for updating the state of game objects (i.e. moving objects, object collision, etc.)
function update(elapsedTime) {
    //rect.x += rect.vel_x * elapsedTime;
    //rect.y += rect.vel_y * elapsedTime;
}

// render is responsible for drawing game objects on the screen
function render() {
    // Fill the background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // Draw the rectangle
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
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
    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.timeStamp;
    });
    window.addEventListener('keyup', function(event) {
        delete inputBuffer[event.key];
    });

    // This just starts the game loop
    requestAnimationFrame(gameLoop);
}

initialize();
