import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import Project from "../models/Project";


const router = Router();

      router.post("/",
            body("projectName").notEmpty().withMessage("Nombre de Proyecto Obligatorio"), // Validacion con express
            body("clientName").notEmpty().withMessage("Nombre de Cliente Obligatorio"),
            body("description").notEmpty().withMessage("Descripcion Obligatoria"),
            handleInputErrors,
            ProjectController.createProject);
      router.get("/", ProjectController.getAllProjects); // Devuelve los proyectos
      /**para router dinamico se agregan ":" */
      router.get("/:id",
            param("id").isMongoId().withMessage("ID no valido"),
            handleInputErrors,
            ProjectController.getProjectById); // Devuelve un proyecto en especifico

      router.put("/:id",
            param("id").isMongoId().withMessage("ID no valido"), // validacion ID
            body("projectName").notEmpty().withMessage("Nombre de royecto Obligatorio"), // Validacion entradas de datos
            body("clientName").notEmpty().withMessage("Nombre de Cliente Obligatorio"),
            body("description").notEmpty().withMessage("Descripcion Obligatorio"),
            handleInputErrors, // revisa entrada de datos
            ProjectController.updateProject);
            
      router.delete("/:id",
            param("id").isMongoId().withMessage("ID no valido"),
            handleInputErrors,
            ProjectController.deleteProject);      

export default router;