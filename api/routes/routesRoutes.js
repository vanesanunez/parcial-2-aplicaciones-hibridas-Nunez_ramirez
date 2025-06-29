import express from "express";
import {createRoute, getRoutes, getRouteById, updateRoute, deleteRoute } from "../controllers/routesController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
/*import { ..., searchRoutesByName } from "../controllers/routesController.js";*/


const routesRouter = express.Router();

routesRouter.post("/", authenticateJWT, createRoute);       // Crear ruta
routesRouter.get("/", getRoutes);                // Obtener todas
routesRouter.get("/:id", getRouteById);          // Obtener por ID
routesRouter.put("/:id", authenticateJWT, updateRoute);     // Actualizar ruta
routesRouter.delete("/:id", authenticateJWT, deleteRoute );  // Eliminar ruta
//routesRouter.get("/search", searchRoutesByName);

export { routesRouter };
