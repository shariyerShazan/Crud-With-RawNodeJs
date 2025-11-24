import http, { IncomingMessage, Server, ServerResponse } from "http";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(`server is running!`);
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "aplication/json" });
      res.end(JSON.stringify({
        message : `Hello from raw nodeJs` ,
        path: req.url
      }))
    }
  }
);
const PORT = process.env.PORT || 3332
server.listen(PORT , ()=> {
    console.log(`server is runnig at http://localhost:${PORT}`)
})