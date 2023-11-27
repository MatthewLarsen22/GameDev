MyGame.renderer.core = (function() {
    'use strict';

    let canvas = document.getElementById("canvas");
    let gl = canvas.getContext("webgl2");

    function initShaderProgram(vsSource, fsSource) {
        let vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
        let fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);

        let shaderProgram = gl.createProgram(); // Create a shader program object to store combined shader program
        gl.attachShader(shaderProgram, vertexShader); // Attach a vertex shader
        gl.attachShader(shaderProgram, fragmentShader); // Attach a fragment shader
        gl.linkProgram(shaderProgram); // Link the shader program

        gl.useProgram(shaderProgram); // Use the combined shader program object

        return shaderProgram;
    }

    function loadShader(type, source) {
        let shader = gl.createShader(type); // Create a new vertex shader object
        gl.shaderSource(shader, source); // Attach shader source code to the shader object
        gl.compileShader(shader); // Compile the shader

        return shader;
    }

    function initBuffer(type, data) {
        let buffer = gl.createBuffer(); // Create a new buffer object
        gl.bindBuffer(type, buffer); // Bind an empty array buffer to it
        gl.bufferData(type, data, gl.STATIC_DRAW) // Pass the data to the buffer
        gl.bindBuffer(type, null); // Unbind the buffer
    
        return buffer;
    };

    function attachAttributeToBuffer(attributeLocation, size, normalize, buffer, bufferType) {
        gl.bindBuffer(bufferType, buffer); // Bind to the vertex buffer object
        gl.vertexAttribPointer(attributeLocation, size, gl.FLOAT, normalize, 0, 0); // point an attribute to the currently bound VBO
        gl.enableVertexAttribArray(attributeLocation); // Enable the attribute
        gl.bindBuffer(bufferType, null); // Unbind the buffer
    };

    function setUniform4fv(uniformLocation, matrix) {
        gl.uniformMatrix4fv(uniformLocation, false, matrix);
    };

    function renderElement(obj){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.buffers.indexBuffer);
        // gl.drawArrays(gl.LINE_STRIP, 0, obj.indices.length);
        gl.drawElements(gl.TRIANGLES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    function getAttributeLocation(program, attributeName) {
        return gl.getAttribLocation(program, attributeName);
    }

    function getUniformLocation(program, uniformName) {
        return gl.getUniformLocation(program, uniformName);
    }

    function clearBackground() {
        // Fill the background
        gl.clearColor(0.4, 0.6, 0.9, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.viewport(0,0,canvas.width,canvas.height);
    }

    function useProgram(program) {
        gl.useProgram(program);
    }

    function createTexture(image) {
        // Create a texture.
        let texture = gl.createTexture();

        // use texture unit 0
        gl.activeTexture(gl.TEXTURE0 + 0);

        // bind to the TEXTURE_2D bind point of texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);

        // Copy the image to the texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);

        return texture;
    }

    return {
        constants: {
            ARRAY_BUFFER: gl.ARRAY_BUFFER,
            ELEMENT_ARRAY_BUFFER: gl.ELEMENT_ARRAY_BUFFER,
        },
        initShaderProgram: initShaderProgram,
        initBuffer: initBuffer,
        attachAttributeToBuffer: attachAttributeToBuffer,
        setUniform4fv: setUniform4fv,
        clearBackground: clearBackground,
        renderElement: renderElement,
        getAttributeLocation: getAttributeLocation,
        getUniformLocation: getUniformLocation,
        useProgram: useProgram,
        createTexture: createTexture
    };
}());