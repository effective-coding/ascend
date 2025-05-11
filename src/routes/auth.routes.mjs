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

export default routes;
