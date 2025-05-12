import express from "express";
import passport from "passport";

const routes = express.Router({ strict: true });

routes.post(
  "/providers/local",
  passport.authenticate("local"),
  (request, response) => {
    return response.sendStatus(200);
  }
);

routes.get("/status", (request, response) => {
  return request.user ? response.sendStatus(200) : response.sendStatus(401);
});

routes.post("/logout", (request, response) => {
  if (!request.user) {
    return response.sendStatus(401);
  }

  request.logOut((err) => {
    return err ? response.sendStatus(401) : response.sendStatus(200);
  });
});

export default routes;
