import type { Request, Response } from "express"
import Project from "../models/Project";


/**
 * Se utiliza sintaxis de clase
 * Se utilizan metodos estaticos para usarlos sin tener qque tener una
 * instancia de la clase
 */
export class ProjectController {

   static createProject = async (req: Request, res: Response) => {
      const project = new Project(req.body); // crea instancia del proyecto desde el modelo
      try{
         /**
          * OTRA FORMA DE CREAR
          * no es necesario la intancia (linea 13) ni el save (linea 19)
          * await Project.create(req.body)
          */
         await project.save(req.body); // Guarda el proyecto en la base de datos
         res.send("Proyecto creado correctamente");
      }catch(error){
            console.log(error)
      }
   }

   static getAllProjects = async (req: Request, res: Response) => {

      res.send("Todos los proyectos");

   }

}