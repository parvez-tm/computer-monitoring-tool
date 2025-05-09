const http = require('http')
const os = require('os');
const fs = require('fs');
const path = require('path');
const si = require('systeminformation');

let location = __dirname + '/index.html'

let server = http.createServer(async (req,res)=>{
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    if(req.url == '/stats'){
        const stats = {
            uptime: os.uptime(),
            freemem: os.freemem(),
            totalmem: os.totalmem(),
            loadavg: os.loadavg(),
            cpus: os.cpus(),
            // temp: os.tmpdir()
          };
        //   console.log(stats,"ad");
            // si.cpuTemperature().then(data => {
            // console.log('CPU Temperature:', data);
            // });
      
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(stats));
    }else{
        fs.readFile(location, (err, data) => {
            if (err) {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end('404: File not found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(data);
            }
          });
    }
})

server.listen(3000, ()=>{
    console.log("Listening on port: 3000");
})
