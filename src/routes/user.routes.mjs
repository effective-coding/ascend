import express from "express";

import User from "../mongoose/schemas/user.mjs";

const routes = express.Router({ strict: true });

routes.get("/", async (request, response) => {
  const users = await User.find();
  return response.status(200).json(users);
});

routes.post("/create", async (request, response) => {
  const user = await User.create({ name: "Jane Doe" });
  return response.status(201).json(user);
});

export default routes;
