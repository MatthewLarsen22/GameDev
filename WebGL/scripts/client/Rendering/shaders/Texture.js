MyGame.renderer.TextureShader = (function(core) {
    'use strict';

    const vsSource = // This is the vertex shader source code
    `#version 300 es
    
    in vec3 aPosition;
    in vec2 aTexCoord;
    out vec2 vTexCoord;
    
    uniform mat4 uTranslationMatrix;
    uniform mat4 uRotationAboutXMatrix;
    uniform mat4 uRotationAboutYMatrix;
    uniform mat4 uRotationAboutZMatrix;
    uniform mat4 uScaleMatrix;
    
    void main()
    {
        gl_Position = uTranslationMatrix * uRotationAboutZMatrix * uRotationAboutYMatrix * uRotationAboutXMatrix * uScaleMatrix * vec4(aPosition,  1.0);
        vTexCoord = aTexCoord;
    }`;
    
    const fsSource = // This is the fragment shader source code
    `#version 300 es
    
    precision lowp float;
    
    in vec2 vTexCoord;
    out vec4 outColor;

    uniform sampler2D uTexture;
    
    void main() {
        outColor = texture(uTexture, vTexCoord);
    }`;

    let that = {
        program: null,
        attributeLocations: {},
        uniformLocations: {}
    };

    that.program = core.initShaderProgram(vsSource, fsSource);
    that.attributeLocations = {
        position: core.getAttributeLocation(that.program, 'aPosition'),
        texture: core.getAttributeLocation(that.program, 'aTexCoord')
    };
    that.uniformLocations = {
        scale: core.getUniformLocation(that.program, 'uScaleMatrix'),
        rotationX: core.getUniformLocation(that.program, 'uRotationAboutXMatrix'),
        rotationY: core.getUniformLocation(that.program, 'uRotationAboutYMatrix'),
        rotationZ: core.getUniformLocation(that.program, 'uRotationAboutZMatrix'),
        translation: core.getUniformLocation(that.program, 'uTranslationMatrix'),
        texture: core.getUniformLocation(that.program, 'uTexture')
    };

    return that;
}(MyGame.renderer.core));