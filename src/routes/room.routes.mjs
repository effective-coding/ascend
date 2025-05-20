import express from "express";

const routes = express.Router({ strict: true });

routes.post("/create", (request, response) => {
  const user = request.user;

  console.log(user)

  return response.sendStatus(200);
});

export default routes;
