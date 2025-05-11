import express from "express";

function createApp() {
  const app = express();

  app.get("/", (req, res) => {
    return res.status(200).json({ message: "server health" });
  });

  return app;
}

export default createApp;
