'use strict';

let http = require('http');
let path = require('path');
let fs = require('fs');

const PORT = 3000;
const mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.png' : 'image/png',
    '.jpg' : 'image/jpg',
    '.mp3' : 'audio/mpeg3',
    '.mp4': 'video/mp4',
    // '.ttf' : 'application/x-font-tff',
    // '.eot' : 'application/vnd.ms-fontobject'
    '.map' : 'application/json'
};

function handleRequest(request, response) {
    let lookup = (request.url === '/' ? '/index.html' : decodeURI(request.url));
    let file = lookup.substring(1, lookup.length);

    //console.log(`request: ${request.url}`);
    fs.access(file, fs.constants.R_OK, (error) => {
        if (!error) {
            //console.log(`Trying to send ${lookup}`);
            fs.readFile(file, (err, data) => {
                let headers = { 'Content-type': mimeTypes[path.extname(lookup)] };

                if (err) {
                    response.writeHead(500);
                    response.end('Server Error!');
                } else {
                    response.writeHead(200, headers);
                    response.end(data);
                }
            });
        } else {
            //console.log(`Failed to find/send: ${lookup} `);
            response.writeHead(404);
            response.end();
        }
    });
}

let server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});