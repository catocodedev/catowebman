const http = require('http');
const fs = require('fs');
const runner = require('child_process');

exports.run = function(port,root) {
    const server = http.createServer((req, res) => {
        console.log(req.rawHeaders)
        console.log(req.url)
        if(req.rawHeaders[1] != root){
        var domain = "users/"+req.rawHeaders[1];
        }else{
        var domain = "admins/root"    
        }
        var file = "./data/web/" + domain + req.url;
        if (req.url.endsWith("/")) {
            file = "./data/web/"+domain+"/"+ req.url + "home.html";
          }
          if (fs.existsSync(file)) {
            if(file.endsWith(".php")){
                // soon tm
              }
            console.log("{INFO} Rendering page")
            }else{
              console.log('{ERROR} server can not find | ' + file +' |')
               file = "./data/web/admins/shared/404.html"
            }
          fs.readFile(file, function(err, data) {
              console.log(file)
              if (err) throw err;
              if (file.endsWith(".html")) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
              }
              else{
                res.write(data);
              }
            return res.end();
            });
    });
    server.listen(port)
        console.log(`Server is running on port ${port}`);
    }