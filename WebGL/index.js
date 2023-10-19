// Step 1: Grab the canvas element and tell it to use a webgl context
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

// Step 2: Prepare Raw Data
const vsSource = // This is the vertex shader source code
`#version 300 es

in vec3 aPosition;
in vec3 aColor;
out vec3 vColor;

uniform mat4 inverseIdentityMatrix;
uniform mat4 uTranslationMatrix;
uniform mat4 uRotationMatrix;
uniform mat4 uScaleMatrix;

void main()
{
    gl_Position =  inverseIdentityMatrix * uScaleMatrix * inverseIdentityMatrix * uTranslationMatrix * uRotationMatrix * uTranslationMatrix * uScaleMatrix * vec4(aPosition,  1.0);
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

function loadShader(gl, type, source) {
    let shader = gl.createShader(type); // Create a new vertex shader object
    gl.shaderSource(shader, source); // Attach shader source code to the shader object
    gl.compileShader(shader); // Compile the shader

    return shader;
}

function initShaderProgram(gl, vsSource, fsSource) {
    let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    let shaderProgram = gl.createProgram(); // Create a shader program object to store combined shader program
    gl.attachShader(shaderProgram, vertexShader); // Attach a vertex shader
    gl.attachShader(shaderProgram, fragmentShader); // Attach a fragment shader
    gl.linkProgram(shaderProgram); // Link the shader program

    return shaderProgram;
}

// Step 3: Prepare the shaders and the shader program
let shaderProgram = initShaderProgram(gl, vsSource, fsSource);
gl.useProgram(shaderProgram); // Use the combined shader program object

const tetrahedron = {
    vertices: [
        0.25, 0.25, 0.25, // x, y, z
        0.25, -0.25, -0.25,
        -0.25, 0.25, -0.25,
        -0.25, -0.25, 0.25
    ],
    indices: [
        0, 2, 1,
        1, 2, 3,
        2, 0, 3,
        0, 1, 3
    ],
    vertexColors: [
        1.0, 0.0, 0.0, // r, g, b
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 0.0
    ],

    buffers: null,

    center: {
        x: 0,
        y: 0,
        z: 0
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0
    },
    scale: {
        x: 1, // width
        y: 1, // height
        z: 1 // depth
    },
    updateModel: function(elapsedTime) {
        // this.center.x += 0.0001 * elapsedTime;
        // this.center.y += 0.0001 * elapsedTime;

        this.rotation.x += (1 / 32) * (Math.PI / 180) * elapsedTime;
        this.rotation.y += (1 / 32) * (Math.PI / 180) * elapsedTime;
        this.rotation.z += (1 / 32) * (Math.PI / 180) * elapsedTime;

        // this.scale.x -= (1/10000) * elapsedTime
        // this.scale.y -= (1/10000) * elapsedTime
        // this.scale.z -= (1/10000) * elapsedTime
    },
    updateRenderer: function(elapsedTime) {
        let translationMatrix = [
            1, 0, 0, tetrahedron.center.x,
            0, 1, 0, tetrahedron.center.y,
            0, 0, 1, tetrahedron.center.z,
            0, 0, 0, 1
        ];
    
        let scaleMatrix = [
            tetrahedron.scale.x, 0, 0, 0,
            0, tetrahedron.scale.y, 0, 0,
            0, 0, tetrahedron.scale.z, 0,
            0, 0, 0, 1
        ];
    
        // let rotationAboutXMatrix = [
        //     1, 0, 0, 0,
        //     0, Math.cos(tetrahedron.rotation.x), -Math.sin(tetrahedron.rotation.x), 0,
        //     0, Math.sin(tetrahedron.rotation.x), Math.cos(tetrahedron.rotation.x), 0,
        //     0, 0, 0, 1
        // ];
        // let rotationAboutYMatrix = [
        //     Math.cos(tetrahedron.rotation.y), 0, Math.sin(tetrahedron.rotation.y), 0,
        //     0, 1, 0, 0,
        //     -Math.sin(tetrahedron.rotation.y), 0, Math.cos(tetrahedron.rotation.y), 0,
        //     0, 0, 0, 1
        // ];
        // let rotationAboutZMatrix = [
        //     Math.cos(tetrahedron.rotation.z), -Math.sin(tetrahedron.rotation.z), 0, 0,
        //     Math.sin(tetrahedron.rotation.z), Math.cos(tetrahedron.rotation.z), 0, 0,
        //     0, 0, 1, 0,
        //     0, 0, 0, 1
        // ];
        let alpha = tetrahedron.rotation.z;
        let beta = tetrahedron.rotation.y;
        let gamma = tetrahedron.rotation.x;
    
        let generalRotationMatrix = [
            Math.cos(alpha) * Math.cos(beta), Math.cos(alpha) * Math.sin(beta) * Math.sin(gamma) - Math.sin(alpha) * Math.cos(gamma), Math.cos(alpha) * Math.sin(beta) * Math.cos(gamma) + Math.sin(alpha) * Math.sin(gamma), 0,
            Math.sin(alpha) * Math.cos(beta), Math.sin(alpha) * Math.sin(beta) * Math.sin(gamma) + Math.cos(alpha) * Math.cos(gamma), Math.sin(alpha) * Math.sin(beta) * Math.cos(gamma) - Math.cos(alpha) * Math.sin(gamma), 0,
            -Math.sin(beta), Math.cos(beta) * Math.sin(gamma), Math.cos(beta) * Math.cos(gamma), 0,
            0, 0, 0, 1
        ];
    
        let modelViewMatrix = transposeMatrix4x4(scaleMatrix);
    
        let inverseIdentityMatrix = [
            -1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, -1
        ];
        gl.uniformMatrix4fv(
            gl.getUniformLocation(shaderProgram, "inverseIdentityMatrix"),
            false,
            transposeMatrix4x4(translationMatrix)
        );
        gl.uniformMatrix4fv(
            gl.getUniformLocation(shaderProgram, "uTranslationMatrix"),
            false,
            inverseIdentityMatrix
        );
        gl.uniformMatrix4fv(
            gl.getUniformLocation(shaderProgram, "uScaleMatrix"),
            false,
            transposeMatrix4x4(scaleMatrix)
        );
        gl.uniformMatrix4fv(
            gl.getUniformLocation(shaderProgram, "uRotationMatrix"),
            false,
            transposeMatrix4x4(generalRotationMatrix)
        );
    },
    render: function(gl) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
};

function transposeMatrix4x4(m) {
    let t = [
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
    ];
    return t;
}

function initBuffers(gl, obj) {
    let vertexBuffer = initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(obj.vertices));
    let vertexColorBuffer = initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(obj.vertexColors));
    let indexBuffer = initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.indices));

    return {
        vertexBuffer: vertexBuffer,
        vertexColorBuffer: vertexColorBuffer,
        indexBuffer: indexBuffer
    };
}

function initBuffer(gl, type, data) {
    let buffer = gl.createBuffer(); // Create a new buffer object
    gl.bindBuffer(type, buffer); // Bind an empty array buffer to it
    gl.bufferData(type, data, gl.STATIC_DRAW) // Pass the data to the buffer
    gl.bindBuffer(type, null); // Unbind the buffer

    return buffer;
}

// Step 4: Prepare Buffer Objects
tetrahedron.buffers = initBuffers(gl, tetrahedron);

//Step 5: Associate the shader programs to buffer objects
gl.bindBuffer(gl.ARRAY_BUFFER, tetrahedron.buffers.vertexBuffer); // Bind to the vertex buffer object
let position = gl.getAttribLocation(shaderProgram, 'aPosition'); //Get the attribute location
gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0); // point an attribute to the currently bound VBO
gl.enableVertexAttribArray(position); // Enable the attribute
gl.bindBuffer(gl.ARRAY_BUFFER, null);

gl.bindBuffer(gl.ARRAY_BUFFER, tetrahedron.buffers.vertexColorBuffer);
let color = gl.getAttribLocation(shaderProgram, 'aColor');
gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(color);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// Get the start time
let lastTimeStamp = performance.now();

// processInput is responsible for handling user input
function processInput(elapsedTime) {
}

// update is responsible for updating the state of game objects (i.e. moving objects, object collision, etc.)
function update(elapsedTime) {
    tetrahedron.updateModel(elapsedTime);
    tetrahedron.updateRenderer(elapsedTime);
}

// render is responsible for drawing game objects on the screen
function render() {
    // Fill the background
    gl.clearColor(0.4, 0.6, 0.9, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0,0,canvas.width,canvas.height);

    tetrahedron.render(gl);
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
