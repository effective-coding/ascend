import express from "express";

import roomRoutes from "./room.routes.mjs";
import authRoutes from "./auth.routes.mjs";
import userRoutes from "./user.routes.mjs";
import healthRoutes from "./health.routes.mjs";

const routes = express.Router({ strict: true });

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/rooms", roomRoutes);
routes.use("/health", healthRoutes);

export default routes;
