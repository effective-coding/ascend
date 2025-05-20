import express from "express";

import User from "../mongoose/schemas/user.schema.mjs";
import { createUser } from "../services/user.service.mjs";
import passport from "passport";
import Room from "../mongoose/schemas/room.schema.mjs";

const routes = express.Router({ strict: true });

routes.get("/", async (request, response) => {
  const users = await User.find();
  return response.status(200).json(users);
});

routes.get("/rooms", async (request, response) => {
  const rooms = await Room.find();
  return response.status(200).json(rooms);
});

routes.post("/create", async (request, response) => {
  if (request.user.role !== "admin") {
    return response.status(401).send("not authorized to create user");
  }

  try {
    const user = await createUser(request.body);
    return response.status(201).json(user);
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
});

export default routes;
