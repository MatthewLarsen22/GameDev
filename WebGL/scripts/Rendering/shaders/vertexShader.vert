#version 300 es

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
}