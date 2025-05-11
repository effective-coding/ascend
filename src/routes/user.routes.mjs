import express from "express";

import User from "../mongoose/schemas/user.schema.mjs";
import { createUser } from "../services/user.service.mjs";

const routes = express.Router({ strict: true });

routes.get("/", async (request, response) => {
  const users = await User.find();
  return response.status(200).json(users);
});

routes.post("/create", async (request, response) => {
  try {
    const user = await createUser(request.body);
    return response.status(201).json(user);
  } catch (error) {
    console.log(error)
    return response.sendStatus(500);
  }
});

export default routes;
