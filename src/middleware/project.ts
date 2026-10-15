import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

declare global{
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

/**Valida si el proyecto existe */
export async function validateProjectExists(req: Request, res: Response, next: NextFunction) {
    try{

        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        console.log(project);

        if(!project){
            const error = new Error("Proyecto no enccontrado");
            return res.status(404).json({error: error.message})
        }
        req.project = project; // se pasa en requeste en el create task
        next();
    }catch(error){
        res.status(500).json({error: "Hubo un error"})
    }
}