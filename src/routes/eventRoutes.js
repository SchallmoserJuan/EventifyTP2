import express from "express";
import * as eventController from "../controllers/eventControllers.js";

const router = express.Router();



// Crear (POST)
router.post("/", eventController.createEvent);

// Actualizar parcialmente (PATCH)
router.patch("/:id", eventController.updateEvent);

export default router;