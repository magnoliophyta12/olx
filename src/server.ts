import express from "express";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

import { connection } from "./config/config.js";
import { clientRedis } from "./config/redis-config.js";
import { roleRoutes } from "./routes/role-routes.js";
import { userRoutes } from "./routes/user-routes.js";

const PORT = 443;
const __dirname = import.meta.dirname; 

const run = async () => {
  await connection.sync();
  console.log("DB connection success");
  await clientRedis.connect();
  console.log("Redis connection success");
  const app = express();

    const options = {
      key: fs.readFileSync(path.join(__dirname, "..", "cert", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "..", "cert", "cert.pem")),
    };

    https
      .createServer(options, app)
      .listen(PORT, () => console.log(`Server is running https://127.0.0.1`));

    app.get("/", (req, res) => {
      res.send("Hello from HTTPS");
    });
    app.use(express.json());
    //app.use("/tokens", tokenRoutes);
    app.use("/users", userRoutes);
    // app.use("/ads", adRoutes);
    // app.use("/photos", photoRoutes);
    // app.use("/messages", messageRoutes);
    // app.use("/categories", categoryRoutes);
    app.use("/roles", roleRoutes);
};

// connection
//   .sync()
//   .then(() => {
//     const app = express();

//     const options = {
//       key: fs.readFileSync(path.join(__dirname, "..", "cert", "key.pem")),
//       cert: fs.readFileSync(path.join(__dirname, "..", "cert", "cert.pem")),
//     };

//     https
//       .createServer(options, app)
//       .listen(PORT, () => console.log(`Server is running https://127.0.0.1`));

//     app.get("/", (req, res) => {
//       res.send("Hello from HTTPS");
//     });
//     app.use(express.json());
//     app.use("/books", bookRoutes);
//     app.use("/users", userRoutes);
//     app.use("/posts", postRoutes);
//     app.use("/profiles", profileRoutes);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
try{
  run();
}
catch(err){
  console.error(err);
}