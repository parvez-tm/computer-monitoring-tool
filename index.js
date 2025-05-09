const http = require('http')
const os = require('os');
const fs = require('fs');
const path = require('path');
const si = require('systeminformation');

let server = http.createServer(async (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url == '/stats') {
    fs.readFile('/sys/class/thermal/thermal_zone0/temp', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading temperature:', err);
        return;
      }

      const tempC = parseInt(data) / 1000;
      const tempF = (tempC * 9 / 5) + 32;

      const stats = {
        uptime: os.uptime(),
        freemem: os.freemem(),
        totalmem: os.totalmem(),
        loadavg: os.loadavg(),
        cpus: os.cpus(),
        temp: `${tempC.toFixed(2)} °C / ${tempF.toFixed(2)} °F`
      };
      // console.log(stats, "ad");
      // si.cpuTemperature().then(data => {
      // console.log('CPU Temperature:', data);
      // });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stats));
    });


  } else {
    // My research on google 
    fs.readFile('dashboard.html', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404: File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });

    // GTP Way 
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end(require('fs').readFileSync('index.html'));
  }
})

server.listen(3000, () => {
  console.log("Listening on port: 3000");
})
