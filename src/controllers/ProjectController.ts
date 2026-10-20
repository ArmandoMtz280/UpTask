import type { Request, Response } from "express"
import IProject from "../models/Project";
import { populate } from "dotenv";


/**
 * Se utiliza sintaxis de clase
 * Se utilizan metodos estaticos para usarlos sin tener qque tener una
 * instancia de la clase
 */
export class ProjectController {

   static createProject = async (req: Request, res: Response) => {
      const project = new IProject(req.body); // crea instancia del proyecto desde el modelo se le pasa el req.body que es el q trae la data
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
   };

   static getAllProjects = async (req: Request, res: Response) => {

      try{
         const projects = await IProject.find({})
         res.json(projects)
      }catch(error){
         console.log(error)
      }

   };

   static getProjectById = async (req: Request, res: Response) => {
      console.log('Entró al controlador:', Date.now());
      const { id } = req.params;
            // console.log(id)
      try{
         console.log('Enviando respuesta:', Date.now());
         const project = await IProject.findById(id).populate("tasks") // Cruza la informacion de los modelos (trae la informacion de tasks)
         
         if(!project){
            const error = new Error("Proyecto no encontrado");
            return res.status(404).json({error: error.message})
         }

         return res.status(200).json(project); // retorna el proyecto


      }catch(error){
         console.log(error)
      }
   };

   static updateProject = async (req: Request, res: Response) => {

       const {id} = req.params;

       try{

         const project = await IProject.findById(id)

         if(!project){
            const error = new Error("Proyecto no Encontrado")
            return res.status(404).json({error: error.message})
         }

         project.clientName = req.body.clientName
         project.projectName = req.body.projectName
         project.description = req.body.descripcion

         await project.save(); // se guarda proyecto
         res.send("Proyecto Actualizado")

       }catch(error){
         console.log(error)
       }

   };

   static deleteProject = async (req: Request, res: Response) => {

       const { id } = req.params;

       try {

         const project = await IProject.findById(id);

         if(!project){
            const error = new Error("Proyecto no Encontrado")
            return res.status(400).json({error: error.message})
         }
   
         await project.deleteOne();
         res.send("Proyecto Eliminado");

       }catch(error){
           console.log(error)
       }

   }

}