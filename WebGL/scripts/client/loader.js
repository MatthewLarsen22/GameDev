let MyGame = {
    screens: {},
    input: {},
    components: {},
    utilities: {},
    renderer: {},
    assets: {},
    constants: {}
};

MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [
        // {
        //     scripts: ['path/to/script'],
        //     message: 'message on load completion',
        //     onComplete: null
        // },
        {
            scripts: ['Utilities/util'],
            message: 'Utilities loaded',
            onComplete: null
        }, {
            scripts: ['Components/Tetrahedron', 'Components/Cube'],
            message: 'Components loaded',
            onComplete: null
        }, {
            scripts: ['Rendering/core'],
            message: 'Core Renderer loaded',
            onComplete: null
        }, {
            scripts: ['Rendering/shaders/Simple', 'Rendering/shaders/Texture'],
            message: 'Shaders loaded',
            onComplete: null
        }, {
            scripts: ['Rendering/Tetrahedron', 'Rendering/Cube', 'Rendering/TexturedCube'],
            message: 'Rendering components loaded',
            onComplete: null
        }, {
            scripts: ['model'],
            message: 'Model loaded',
            onComplete: null
        }, {
            scripts: ['main'],
            message: 'Main loaded',
            onComplete: null
        }
    ];
    let assetOrder = [
        // {
        // key: 'asset-key',
        // source: 'path/to/asset'
        // },
        {
            key: 'skybox',
            source: 'assets/cubemaps_skybox.png'
        }, {
            key: 'grass',
            source: 'assets/minecraft_grass.png'
        },
    ];

    function loadScripts(scripts, onComplete) {
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, () => {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    function loadAssets(assets, onSuccess, onError, onComplete) {
        let entry = 0;

        if (assets.length > 0) {
            entry = assets[0];
            loadAsset(entry.source,
                (asset) => {
                    onSuccess(entry, asset);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                (error) => {
                    onError(error);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                }
            );
        } else {
            onComplete();
        }
    }

    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = (fileExtension === 'txt') ? 'text' : 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                        asset.style.width = 256;
                        asset.style.width = 192;
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else if (fileExtension === 'txt') {
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    }
                    else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    if (xhr.responseType === 'blob') {
                        if (fileExtension === 'mp3') {
                            asset.oncanplaythrough = function() {
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        else {  // not terrific assumption that it has an 'onload' event, but that is what we are doing
                            asset.onload = function() {
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        asset.src = window.URL.createObjectURL(xhr.response);
                    }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
            xhr.send();
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }
    }

    function mainComplete() {
        console.log('It is all loaded up.');
        MyGame.main.initialize();
    }

    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );
}());