MyGame.renderer.SimpleShader = (function(core) {
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

    let that = {
        program: null,
        attributeLocations: {},
        uniformLocations: {}
    };

    that.program = core.initShaderProgram(vsSource, fsSource);
    that.attributeLocations = {
        position: core.getAttributeLocation(that.program, 'aPosition'),
        color: core.getAttributeLocation(that.program, 'aColor')
    };
    that.uniformLocations = {
        scale: core.getUniformLocation(that.program, 'uScaleMatrix'),
        rotationX: core.getUniformLocation(that.program, 'uRotationAboutXMatrix'),
        rotationY: core.getUniformLocation(that.program, 'uRotationAboutYMatrix'),
        rotationZ: core.getUniformLocation(that.program, 'uRotationAboutZMatrix'),
        translation: core.getUniformLocation(that.program, 'uTranslationMatrix')
    };

    return that;
}(MyGame.renderer.core));