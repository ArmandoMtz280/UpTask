import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global{
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

/**Valida si el proyecto existe */
export async function taskExists(req: Request, res: Response, next: NextFunction) {
    try{

        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        console.log(task);

        if(!task){
            const error = new Error("Task no enccontrada");
            return res.status(404).json({error: error.message})
        }
        req.task = task; // se pasa en requeste en el create task
        next();
    }catch(error){
        res.status(500).json({error: "Hubo un error"})
    }
};

export async function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    if(req.task.project.toString() !== req.project._id.toString()){ // Valida q la tarea pertenezca a un proyecto
              const error = new Error("Accion no valida")
              return res.status(400).json({error: error.message})
         }

         next();
}