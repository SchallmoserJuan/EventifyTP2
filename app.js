import express from "express";
import mongoose from "mongoose";
import "./src/config/database.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

/*
 * Espacio para importacion de rutas / middlewares
*/

const server = app.listen(PORT, () => {
  console.log(` Servidor de Eventify corriendo en http://localhost:${PORT}`);
});

/*
 * apagado ordenado del servidor
 */
const gracefulShutdown = () => {
  console.log("...Recibida señal de apagado (SIGINT/SIGTERM), cerrando servidor ordenadamente...");

  // 1. Dejar de aceptar nuevas conexiones
  server.close(() => {
    console.log("Servidor Express cerrado.");

    // 2. Cerrar la conexión de Mongoose 
    mongoose.connection.close(false, () => {
      console.log("Conexión de Mongoose cerrada.");
      process.exit(0);
    });
  });
};

process.on("SIGTERM", gracefulShutdown); // Señal de apagado 
process.on("SIGINT", gracefulShutdown); // Señal de interrupción 

export default app;