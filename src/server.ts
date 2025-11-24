import http, { IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(`Server received a request: ${req.method} ${req.url}`);

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from raw Node.js",
          path: req.url,
          success: true
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Route not found",
          path: req.url,
        })
      );
    }
  }
);

const PORT = process.env.PORT || 3332;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
