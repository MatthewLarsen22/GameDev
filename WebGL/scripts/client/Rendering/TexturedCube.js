MyGame.renderer.TexturedCube = (function(core) {
    'use strict';
    let that = {
        vertices: [
            // TOP FACE
            -1, 1, 1, // x, y, z
            1, 1, 1,
            -1, 1, -1,
            1, 1, -1,
            // LEFT FACE
            -1, 1, 1,
            -1, 1, -1,
            -1, -1, 1,
            -1, -1, -1,
            // FRONT FACE
            -1, 1, -1,
            1, 1, -1,
            -1, -1, -1,
            1, -1, -1,
            // RIGHT FACE
            1, 1, -1,
            1, 1, 1,
            1, -1, -1,
            1, -1, 1,
            // BACK FACE
            1, 1, 1,
            -1, 1, 1,
            1, -1, 1,
            -1, -1, 1,
            // BOTTOM FACE
            -1, -1, -1,
            1, -1, -1,
            -1, -1, 1,
            1, -1, 1
        ],
        indices: [
            // TOP FACE
            0, 2, 1,
            2, 3, 1,
            // LEFT FACE
            4, 6, 5, 
            6, 7, 5,
            // FRONT FACE
            8, 10, 9,
            10, 11, 9,
            // RIGHT FACE
            12, 14, 13,
            14, 15, 13,
            // BACK FACE
            16, 18, 17,
            18, 19, 17,
            // BOTTOM FACE
            20, 22, 21,
            22, 23, 21
        ],
        textureCoords: [
            // TOP FACE
            0.25, 0,
            0.5, 0,
            0.25, 1/3,
            0.5, 1/3,
            // LEFT FACE
            0, 1/3,
            0.25, 1/3,
            0, 2/3,
            0.25, 2/3,
            // FRONT FACE
            0.25, 1/3,
            0.5, 1/3,
            0.25, 2/3,
            0.5, 2/3,
            // RIGHT FACE
            0.5, 1/3,
            0.75, 1/3,
            0.5, 2/3,
            0.75, 2/3,
            // BACK FACE
            0.75, 1/3,
            1, 1/3,
            0.75, 2/3,
            1, 2/3,
            // BOTTOM FACE
            0.25, 2/3,
            0.5, 2/3,
            0.25, 1,
            0.5, 1,
        ],
        // textureCoords: [
        //     // TOP FACE
        //     0.25, 0,
        //     0.5, 0,
        //     0.25, 0.5,
        //     0.5, 0.5,
        //     // LEFT FACE
        //     0, 0.5,
        //     0.25, 0.5,
        //     0, 1,
        //     0.25, 1,
        //     // FRONT FACE
        //     0.25, 0.5,
        //     0.5, 0.5,
        //     0.25, 1,
        //     0.5, 1,
        //     // RIGHT FACE
        //     0.5, 0.5,
        //     0.75, 0.5,
        //     0.5, 1,
        //     0.75, 1,
        //     // BACK FACE
        //     0.5, 0,
        //     0.75, 0,
        //     0.5, 0.5,
        //     0.75, 0.5,
        //     // BOTTOM FACE
        //     0, 0,
        //     0.25, 0,
        //     0, 0.5,
        //     0.25, 0.5,
        // ],
        texture: null,
    
        buffers: {
            vertexBuffer: null,
            textureCoordBuffer: null,
            indexBuffer: null
        },
        shaderProgram: null,
        attributeLocations: {
            position: null,
            texture: null
        },
        uniformLocations: {
            scale: null,
            rotationX: null,
            rotationY: null,
            rotationZ: null,
            translation: null,
            texture: null
        },

        initialize: function(shader) {
            this.shaderProgram = shader.program;
            this.attributeLocations = shader.attributeLocations;
            this.uniformLocations = shader.uniformLocations;

            this.buffers.vertexBuffer = core.initBuffer(core.constants.ARRAY_BUFFER, new Float32Array(this.vertices));
            this.buffers.textureCoordBuffer = core.initBuffer(core.constants.ARRAY_BUFFER, new Float32Array(this.textureCoords));
            this.buffers.indexBuffer = core.initBuffer(core.constants.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices));

            core.attachAttributeToBuffer(this.attributeLocations.position, 3, false, this.buffers.vertexBuffer, core.constants.ARRAY_BUFFER);
            core.attachAttributeToBuffer(this.attributeLocations.texture, 2, true, this.buffers.textureCoordBuffer, core.constants.ARRAY_BUFFER);

            this.texture = core.createTexture(MyGame.assets["grass"]);
        },
        render: function(model) {
            core.useProgram(this.shaderProgram);

            core.attachAttributeToBuffer(this.attributeLocations.position, 3, false, this.buffers.vertexBuffer, core.constants.ARRAY_BUFFER);
            core.attachAttributeToBuffer(this.attributeLocations.texture, 2, true, this.buffers.textureCoordBuffer, core.constants.ARRAY_BUFFER);

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