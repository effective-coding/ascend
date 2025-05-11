import "dotenv/config";

import debug from "debug";
import mongoose from "mongoose";

import createApp from "./app.mjs";

const server = createApp();
const port = process.env.PORT || 3000;
const logger = debug("app:database");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => logger("connected"))
  .catch((e) => logger("unable to connect: ", e));

server.listen(port, () => {
  console.log(`application running on http://localhost:${port}`);
});
