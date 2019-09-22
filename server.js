const http = require('http');
const fileSystem = require('fs');

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

const server = http.createServer(function (req, resp) {
    	msleep(3 * 1000);
	fileSystem.readFile('./index.html', function (error, fileContent) {
        if (error) {
            resp.writeHead(500, {'Content-Type': 'text/plain'});
            resp.end('Error');
        }
        else {
            resp.writeHead(200, {'Content-Type': 'text/html'});
            resp.write(fileContent);
            resp.end();
        }
    });
});

server.listen(8080);


