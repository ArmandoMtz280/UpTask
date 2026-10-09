import { Router } from "express";
import { body } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErros } from "../middleware/validation";


const router = Router();

      router.post("/",
            body("projectName").notEmpty().withMessage("Nombre de Proyecto Obligatorio"), // Validacion con express
            body("clientName").notEmpty().withMessage("Nombre de Cliente Obligatorio"),
            body("description").notEmpty().withMessage("Descripcion Obligatoria"),
            handleInputErros,
            ProjectController.createProject);
      router.get("/", ProjectController.getAllProjects); // Devuelve los proyectos

export default router;