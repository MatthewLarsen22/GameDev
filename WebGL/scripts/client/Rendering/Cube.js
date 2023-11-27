MyGame.renderer.Cube = (function(core) {
    'use strict';
    let that = {
        vertices: [
            -1, 1, -1, // x, y, z
            1, 1, -1,
            -1, -1, -1,
            1, -1, -1,
            -1, 1, 1,
            1, 1, 1,
            -1, -1, 1,
            1, -1, 1
        ],
        indices: [
            // TOP FACE
            5, 4, 0,
            5, 0, 1,
            // LEFT FACE
            0, 4, 6, 
            0, 6, 2,
            // FRONT FACE
            1, 0, 2,
            1, 2, 3,
            // RIGHT FACE
            5, 1, 3,
            5, 3, 7,
            // BACK FACE
            4, 5, 7,
            4, 7, 6,
            // BOTTOM FACE
            3, 2, 6,
            3, 6, 7
        ],
        // vertexColors: [
        //     Math.random(), Math.random(), Math.random(), // r, g, b
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random(),
        //     Math.random(), Math.random(), Math.random()
        // ],
        vertexColors: [
            1, 0, 0, // r, g, b
            0, 1, 0,
            0, 0, 1,
            1, 1, 0,
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
            1, 1, 0
        ],
    
        buffers: {
            vertexBuffer: null,
            vertexColorBuffer: null,
            indexBuffer: null
        },
        shaderProgram: null,
        attributeLocations: {
            position: null,
            color: null
        },
        uniformLocations: {
            scale: null,
            rotationX: null,
            rotationY: null,
            rotationZ: null,
            translation: null
        },

        initialize: function(shader) {
            this.shaderProgram = shader.program;
            this.attributeLocations = shader.attributeLocations;
            this.uniformLocations = shader.uniformLocations;

            this.buffers.vertexBuffer = core.initBuffer(core.constants.ARRAY_BUFFER, new Float32Array(this.vertices));
            this.buffers.vertexColorBuffer = core.initBuffer(core.constants.ARRAY_BUFFER, new Float32Array(this.vertexColors));
            this.buffers.indexBuffer = core.initBuffer(core.constants.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices));

            core.attachAttributeToBuffer(this.attributeLocations.position, 3, false, this.buffers.vertexBuffer, core.constants.ARRAY_BUFFER);
            core.attachAttributeToBuffer(this.attributeLocations.color, 3, false, this.buffers.vertexColorBuffer, core.constants.ARRAY_BUFFER);
        },
        render: function(model) {
            core.useProgram(this.shaderProgram);

            core.attachAttributeToBuffer(this.attributeLocations.position, 3, false, this.buffers.vertexBuffer, core.constants.ARRAY_BUFFER);
            core.attachAttributeToBuffer(this.attributeLocations.color, 3, false, this.buffers.vertexColorBuffer, core.constants.ARRAY_BUFFER);

            let matrices = model.getUniformMatrices();

            core.setUniform4fv(this.uniformLocations.scale, MyGame.utilities.transposeMatrix4x4(matrices.scaleMatrix));
            core.setUniform4fv(this.uniformLocations.rotationZ, MyGame.utilities.transposeMatrix4x4(matrices.rotationAboutZMatrix));
            core.setUniform4fv(this.uniformLocations.rotationY, MyGame.utilities.transposeMatrix4x4(matrices.rotationAboutYMatrix));
            core.setUniform4fv(this.uniformLocations.rotationX, MyGame.utilities.transposeMatrix4x4(matrices.rotationAboutXMatrix));
            core.setUniform4fv(this.uniformLocations.translation, MyGame.utilities.transposeMatrix4x4(matrices.translationMatrix));

            core.renderElement(this);
        }
    };

    return that;
}(MyGame.renderer.core));