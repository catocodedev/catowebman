const http = require('http');
const fs = require('fs');

exports.run = function(port,root) {
    const server = http.createServer((req, res) => {
        if(req.rawHeaders[1] != root){
        var domain = "users/"+req.rawHeaders[1];
        }else{
        var domain = "admins/root"    
        }
        var file = "./data/web/" + domain + req.url;
        if (req.url.endsWith("/")) {
            file = "./data/web/"+domain+ req.url + "home.html";
          }
          if (fs.existsSync(file)) {
            if(file.endsWith(".php")){
                // soon tm
              }
            }else{
              console.log('{ERROR} server can not find | ' + file +' |')
              if (!req.url.includes(".")) {
               file = "./data/web/admins/shared/404.html"
              }else{
                if(req.url.endsWith("sadcat.jfif")){
                  file = "./data/web/admins/shared/sadcat.jfif"
                  }else{
                file = "./data/web/admins/shared/404.null"
                  }
              }
            }
            console.log(file)
          fs.readFile(file, function(err, data) {
              console.log(file)
              if (err) console.log(err);
              if (file.endsWith(".html")) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
              }
                else if (file.endsWith(".null")) {
            res.writeHead(404, {'Content-Type': 'text/html'});
              }
              else{
                res.write(data);
              }
            return res.end();
            });
    });
    server.listen(port)
        console.log(`Web Server is running on port ${port}`);
    }