MyGame.renderer.Tetrahedron = (function(core) {
    'use strict';
    let that = {
        // vertices: [
        //     1, 1, 1, // x, y, z
        //     1, -1, -1,
        //     -1, 1, -1,
        //     -1, -1, 1
        // ],
        // indices: [
        //     0, 2, 1,
        //     1, 2, 3,
        //     2, 0, 3,
        //     0, 1, 3
        // ],
        // vertexColors: [
        //     1.0, 0.0, 0.0, // r, g, b
        //     0.0, 1.0, 0.0,
        //     0.0, 0.0, 1.0,
        //     1.0, 1.0, 0.0
        // ],

        vertices: [
            1, 1, 1, // x, y, z
            -1, 1, -1,
            1, -1, -1,
            1, -1, -1,
            -1, 1, -1,
            -1, -1, 1,
            -1, 1, -1,
            1, 1, 1,
            -1, -1, 1,
            1, 1, 1,
            1, -1, -1,
            -1, -1, 1,
        ],
        indices: [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9, 10, 11
        ],
        // vertexColors: [
        //     1.0, 0.0, 0.0, // r, g, b
        //     1.0, 0.0, 0.0,
        //     1.0, 0.0, 0.0,
        //     0.0, 1.0, 0.0,
        //     0.0, 1.0, 0.0,
        //     0.0, 1.0, 0.0,
        //     0.0, 0.0, 1.0,
        //     0.0, 0.0, 1.0,
        //     0.0, 0.0, 1.0,
        //     1.0, 1.0, 0.0,
        //     1.0, 1.0, 0.0,
        //     1.0, 1.0, 0.0
        // ],
        vertexColors: [
            Math.random(), Math.random(), Math.random(), // r, g, b
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random()
        ],
    
        buffers: {
            vertexBuffer: null,
            vertexColorBuffer: null,
            indexBuffer: null
        },
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

        initialize: function(attributeLocations, uniformLocations) {
            this.attributeLocations = attributeLocations;
            this.uniformLocations = uniformLocations;

            this.buffers.vertexBuffer = core.initBuffer(core.constants.ARRAY_BUFFER, new Float32Array(this.vertices));
            this.buffers.vertexColorBuffer = core.initBuffer(core.constants.ARRAY_BUFFER, new Float32Array(this.vertexColors));
            this.buffers.indexBuffer = core.initBuffer(core.constants.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices));

            core.attachAttributeToBuffer(this.attributeLocations.position, this.buffers.vertexBuffer, core.constants.ARRAY_BUFFER);
            core.attachAttributeToBuffer(this.attributeLocations.color, this.buffers.vertexColorBuffer, core.constants.ARRAY_BUFFER);
        },
        render: function(model) {
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