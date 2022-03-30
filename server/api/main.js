const http = require('http');
const fs = require('fs');

exports.run = function(port,key) {
    var data = "";
    const server = http.createServer((req, res) => {
        console.log("METHOD: " + req.method + " | ENDPOINT: " + req.url + " | AUTH: " + req.headers.authorization);
        console.log(req.headers);
        console.log(req);
        try{
        auth =  JSON.parse(req.headers.authorization);
        }catch(e){
        auth = "none";
        }
        if(auth.key == key){
        switch (req.method) 
        {
            case "GET":
                if (req.url == "/") {
                    data = {"status": "OK"};
                }else if(req.url == "/version" || req.url == "/ver"){
                    data = {"version": "1.0.0"};
                }else{
                    data = {"status": "404"};
                }
                break;
            case "POST":
                if (req.url == "/") {
                    data = {"status": "OK"};
                }else{
                    data = {"status": "404"};
                }
                break;
            case "PATCH":
                if (req.url == "/") {
                    data = {"status": "OK"};
                }else{
                    data = {"status": "404"};
                }
                break;
            case "DELETE":
                if (req.url == "/") {
                    data = {"status": "OK"};
                }else{
                    data = {"status": "404"};
                }
                break;
            default:
                data = {"status": "Error"};
                break;
        }
    }else{
        data = {"status": "Error"};
    }
        if(data.status == "404"){
            res.writeHead(404, {'Content-Type': 'application/json'});
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(data));
    }
    return res.end();
    });
    server.listen(port)
        console.log(`API Server is running on port ${port}`);
    }