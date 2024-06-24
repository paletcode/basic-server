import http from "node:http";
import dittoJson from "./resources/jsons/ditto.js";
//const dittoJson = require("./resources/jsons/ditto.js");

const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case "GET":
      switch (url) {
        //Home
        case "/":
          res.setHeader("Control-type", "text/html");
          return res.end("<h1>Home</h1>");
        //About
        case "/about":
          res.setHeader("Control-type", "text/html");
          return res.end("<h1>About</h1>");
        //JSON example
        case "/pokemon/ditto":
          res.setHeader("Control-type", "application/json");
          return res.end(JSON.stringify(dittoJson));
        default:
          res.statusCode = 404;
          res.setHeader("Control-type", "text/html");
          return res.end("<h1>404</h1>");
      }

    case "POST":
      switch (url) {
        case "/pokemon":
          let body = "";

          //listen to the data event
          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const data = JSON.parse(body);
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });
          break;

        default:
          res.statusCode = 404;
          res.setHeader("Control-type", "text/html");
          return res.end("<h1>404</h1>");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
  console.log("listening on port 3000");
});
