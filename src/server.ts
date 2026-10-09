/**Servidor */

import express from "express";
import dotenv from "dotenv"
import dns from "node:dns"
import { connectDB } from "./config/db";
import  projectRoutes from "./routes/projectRoutes";
 


dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config() // para q tome las variables de entorno

connectDB(); // Conexion DB

const app = express(); // server
      app.use(express.json()) // habilita lectura de json

// Routes
      app.use("/api/projects", projectRoutes);

export default app;