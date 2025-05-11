import express from "express";

import userRoutes from "./user.routes.mjs";

const routes = express.Router({ strict: true });

routes.use("/users", userRoutes);

export default routes;
