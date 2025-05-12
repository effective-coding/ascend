import debug from "debug";

import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";

import { RedisStore } from "connect-redis";
import { createClient } from "redis";

import url from "node:url";
import path from "node:path";

import routes from "./routes/index.mjs";
import localStrategy from "./passport/strategies/local.strategy.mjs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createApp() {
  const app = express();
  const logger = debug("app:redis");
  const redisClient = createClient();

  redisClient
    .connect()
    .then(() => logger("connected"))
    .catch(() => logger("unable to connect to redis instance"));

  app.disable("X-Powered-By");

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
      store: new RedisStore({
        client: redisClient,
        prefix: 'ascend:'
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(localStrategy);

  app.use("/assets", express.static(path.join(__dirname, "assets")));
  app.use("/api", routes);

  return app;
}

export default createApp;
