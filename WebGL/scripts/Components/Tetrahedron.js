MyGame.components.Tetrahedron = function(spec) {
    'use strict';
    let that = {
        center: spec.center,
        rotation: spec.rotation,
        scale: spec.scale,
        speed: spec.speed,

        uniformMatrices: {
            translationMatrix: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ],
            scaleMatrix: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ],
            rotationAboutXMatrix: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ],
            rotationAboutYMatrix: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ],
            rotationAboutZMatrix: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ],
            // generalRotationMatrix: [
            //     1, 0, 0, 0,
            //     0, 1, 0, 0,
            //     0, 0, 1, 0,
            //     0, 0, 0, 1
            // ]
        },
        update: function(elapsedTime) {
            // this.center.x += 0.0001 * elapsedTime;
            // this.center.y += 0.0001 * elapsedTime;
    
            this.rotation.x += (1 / 32) * (Math.PI / 180) * this.speed * elapsedTime;
            this.rotation.y += (1 / 32) * (Math.PI / 180) * this.speed * elapsedTime;
            this.rotation.z += (1 / 32) * (Math.PI / 180) * this.speed * elapsedTime;
    
            // this.scale.x += (1/10000) * elapsedTime
            // this.scale.y += (1/10000) * elapsedTime
            // this.scale.z += (1/10000) * elapsedTime
    
            this.uniformMatrices = {
                translationMatrix: [
                    1, 0, 0, this.center.x,
                    0, 1, 0, this.center.y,
                    0, 0, 1, this.center.z,
                    0, 0, 0, 1
                ],
                scaleMatrix: [
                    this.scale.x, 0, 0, 0,
                    0, this.scale.y, 0, 0,
                    0, 0, this.scale.z, 0,
                    0, 0, 0, 1
                ],
                rotationAboutXMatrix: [
                    1, 0, 0, 0,
                    0, Math.cos(this.rotation.x), -Math.sin(this.rotation.x), 0,
                    0, Math.sin(this.rotation.x), Math.cos(this.rotation.x), 0,
                    0, 0, 0, 1
                ],
                rotationAboutYMatrix: [
                    Math.cos(this.rotation.y), 0, Math.sin(this.rotation.y), 0,
                    0, 1, 0, 0,
                    -Math.sin(this.rotation.y), 0, Math.cos(this.rotation.y), 0,
                    0, 0, 0, 1
                ],
                rotationAboutZMatrix: [
                    Math.cos(this.rotation.z), -Math.sin(this.rotation.z), 0, 0,
                    Math.sin(this.rotation.z), Math.cos(this.rotation.z), 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ],
                // generalRotationMatrix: [
                //     Math.cos(this.rotation.z) * Math.cos(this.rotation.y), Math.cos(this.rotation.z) * Math.sin(this.rotation.y) * Math.sin(this.rotation.x) - Math.sin(this.rotation.z) * Math.cos(this.rotation.x), Math.cos(this.rotation.z) * Math.sin(this.rotation.y) * Math.cos(this.rotation.x) + Math.sin(this.rotation.z) * Math.sin(this.rotation.x), 0,
                //     Math.sin(this.rotation.z) * Math.cos(this.rotation.y), Math.sin(this.rotation.z) * Math.sin(this.rotation.y) * Math.sin(this.rotation.x) + Math.cos(this.rotation.z) * Math.cos(this.rotation.x), Math.sin(this.rotation.z) * Math.sin(this.rotation.y) * Math.cos(this.rotation.x) - Math.cos(this.rotation.z) * Math.sin(this.rotation.x), 0,
                //     -Math.sin(this.rotation.y), Math.cos(this.rotation.y) * Math.sin(this.rotation.x), Math.cos(this.rotation.y) * Math.cos(this.rotation.x), 0,
                //     0, 0, 0, 1
                // ]
            }
        },
        getUniformMatrices: function() {
            return this.uniformMatrices;
        }
    };

    return that;
};