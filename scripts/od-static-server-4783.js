const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "out");
const port = 4783;
const mime = { ".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".woff2":"font/woff2",".woff":"font/woff",".svg":"image/svg+xml",".json":"application/json",".txt":"text/plain",".ico":"image/x-icon",".map":"application/json" };
http.createServer((req,res)=>{
  try {
    let url = decodeURIComponent((req.url||"/").split("?")[0]);
    if (url.endsWith("/")) url += "index.html";
    let file = path.join(root, url);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      const idx = path.join(file, "index.html");
      if (fs.existsSync(idx)) file = idx;
      else { res.writeHead(404); res.end("404 directory "+url); return; }
    }
    if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file = file + ".html";
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end("404 "+url); return; }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {"Content-Type": mime[ext]||"application/octet-stream"});
    fs.createReadStream(file).pipe(res);
  } catch (e) {
    if (!res.headersSent) res.writeHead(500);
    res.end("500");
  }
}).listen(port, "127.0.0.1", ()=>console.log("STATIC http://127.0.0.1:"+port+"/account/orders/DOH202405160001.html"));
