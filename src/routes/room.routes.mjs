import express from "express";
import Room from "../mongoose/schemas/room.schema.mjs";

const routes = express.Router({ strict: true });

routes.post("/create", async (request, response) => {
  const user = request.user;

  if (user.role !== "admin") {
    return response.sendStatus(401);
  }

  try {
    await Room.create({ name: request.body.name });
    return response.sendStatus(201);
  } catch (error) {
    return response.sendStatus(500);
  }
});

export default routes;
