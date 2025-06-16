
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { usersRouter, reportsRouter, routesRouter } from "./routes/index.js";
import cors from "cors"


dotenv.config();

const app = express();

app.use(cors()); //allow all origins

//conexión a la DB
mongoose.connect(process.env.MONGODB_URI) //este intento de conexion devuelve una promesa
  .then(() => console.log("Conexión con MongoDB exitosa"))
  .catch(() => console.log("Error al conectar con MongoDB"));

const __filename = fileURLToPath(import.meta.url); //traer la ruta absoluta al archivo
const __dirname = path.dirname(__filename);

app.use(express.json());

// rutas
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/routes', routesRouter);

//Archivos estáticos (los guardé en carpeta public)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("API running");
});

