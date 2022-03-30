const http = require('http');
const fs = require('fs');

exports.run = function(port,root) {
    const server = http.createServer((req, res) => {
        console.log(root)
        console.log("URL: " + req.rawHeaders[1]);
        if(req.rawHeaders[1] == root || req.rawHeaders[1] == "dash."+root){
          if(req.rawHeaders[1] == "dash."+root){
            var domain = "admins/dash";
            }else{
            var domain = "admins/root"
            }
        }else{

        var domain = "users/"+req.rawHeaders[1];
 
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
              if (!req.url.endsWith(".html")) {
                if(req.url.endsWith("sadcat.jfif")){
                  file = "./data/web/admins/shared/sadcat.jfif"
                }else  if(req.url.endsWith("tnarr.mp4")){
                  file = "./data/web/admins/shared/tnarr.mp4"
                  }
                  else{
                file = "./data/web/admins/shared/404.null"
                  }
              }else{
                file = "./data/web/admins/shared/404.html"
                if(req.url.endsWith("tnarr.html")){
                  file = "./data/web/admins/shared/tnarr.html"
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