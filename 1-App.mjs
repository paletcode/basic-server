import http from "node:http";
import fs from "node:fs";
const desiredPort = 3000;

const processRequest = (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200; //OK
    res.setHeader("Content-type", "text/plain");
    res.end("Hello World");
    //contact
  } else if (req.url === "/contact") {
    res.statusCode = 200; //OK
    res.setHeader("Content-type", "text/plain");
    res.end("Contact endpoint");
    //imagen
  } else if (req.url === "/image") {
    fs.readFile("./resources/images/edit_dv2.png", (err, data) => {
      if (err) {
        res.statusCode = 500; //server
        res.setHeader("Content-type", "text/html");
        res.end("<h1>500</h1>");
      } else {
        res.setHeader("Content-type", "image/png");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404; //not found
    res.setHeader("Content-type", "text/html");
    res.end("<h1>404<H1>");
  }
};

// Create a local server to receive data from
const server = http.createServer(processRequest);

// the server listens on the selected port.
server.listen(desiredPort, () => {
  console.log(`server listening on port ${desiredPort}`);
});
