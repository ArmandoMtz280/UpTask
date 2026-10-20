import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";


const router = Router();

      // Evita repetir un parametro en este caso la validacion del priojecto
      router.param("projectId", projectExists)// valida que el pryecto exita

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
            
/**RUTAS TASKS */
      // Evita repetir un parametro en este caso la validacion del priojecto
      router.param("taskId", taskExists) // valida que la tarea exista
      router.param("taskId", taskBelongsToProject) // valida que la tarea pertenezca a un proyecto
      

      // Crea una Tarea
      router.post("/:projectId/tasks",
            body("name").notEmpty().withMessage("El nombre de la tare es obligatorio"),
            body("description").notEmpty().withMessage("La descripcion es obligatoria"),
            handleInputErrors,
            TaskController.createTask,
      );
      // Obtiene todas las tareas
      router.get("/:projectId/tasks",
            TaskController.getProjectTasks,
      );
      // Obtiene una Tarea por ID
      router.get("/:projectId/tasks/:taskId",
            param("taskId").isMongoId().withMessage("ID no valido"),
            TaskController.getTaskById,
      );
      // Actualiza una tarea
      router.put("/:projectId/tasks/:taskId",
            param("taskId").isMongoId().withMessage("ID no valido"), // valida el Id 
            body("name").notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
            body("description").notEmpty().withMessage("La descripcion de la tarea es obligatoria"),
            handleInputErrors,
            TaskController.updateTask
      );
      // Borra una tarea
      router.delete("/:projectId/tasks/:taskId",
            param("taskId").isMongoId().withMessage("ID no valido"),
            TaskController.deleteTask,
      );

      // Actualizar Status 
      router.post("/:projectId/tasks/:taskId/status",
            param("taskId").isMongoId().withMessage("ID no valido"),
            body("status").notEmpty().withMessage("El Estado es Obligatorio"),
            handleInputErrors,
            TaskController.updateStatus,
      )

export default router;