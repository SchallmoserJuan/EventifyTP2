import Event from "../models/Evento.js"; // Import ESM

// Crear nuevo evento
export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json({ success: true, data: event });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    return next(err);
  }
};

// Actualizar parcialmente (PATCH)
export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Evento no encontrado" });
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    return next(err);
  }
};
