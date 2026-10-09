import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator"; // Obtiene los resultados de la validacion

export const handleInputErros = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req); // Obtiene resultado de la validacion del request
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next();

}