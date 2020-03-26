const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');


const server = http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'text/html'});
	
    fs.readFile('index.html', 'utf8', function(error, data) {
        response.write(data);
    

    if (request.method === 'POST') {
        collectRequestData(request, result => {
            console.log(result);
                fs.writeFile('message.txt', result.message, (error)=>{
                 console.log(`Inputted message is: ${result.message}`);
            });
            response.end();
        });
      };
   response.end();
  });
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


server.listen(8080);

