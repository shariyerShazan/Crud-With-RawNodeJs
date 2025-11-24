import http, { IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
import { addRoutes } from "./routes/RoutesHandler.js";
dotenv.config();


addRoutes("Get" , "/" , (req, res)=> {

})

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(`➡️ ${req.method} ${req.url}`);

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "Hello from raw Node.js",
          path: req.url,
          success: true,
        })
      );
    }

    if (req.url === "/user" && req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const user = JSON.parse(body);

          res.writeHead(201, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              message: "User created successfully",
              data: user,
              success: true,
            })
          );
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              message: "Invalid JSON format",
              success: false,
            })
          );
        }
      });

      return;
    }

    // ========== 404 ==========
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Route not found",
        path: req.url,
      })
    );
  }
);

const PORT = process.env.PORT || 3332;

server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
