import "dotenv/config";

import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import url from "node:url";
import path from "node:path";

import routes from "./routes/index.mjs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createApp() {
  const app = express();

  app.disable("X-Powered-By");

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.use("/assets", express.static(path.join(__dirname, "assets")));
  app.use("/api", routes);

  return app;
}

export default createApp;
