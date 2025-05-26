import express from "express";

const routes = express.Router({ strict: true });

routes.get("/status", (request, response) => {
  return response
    .status(200)
    .json({ status: "healthy", isOnline: true, uptime: process.uptime() });
});

export default routes;
