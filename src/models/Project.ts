import mongoose, { Schema, Document } from "mongoose";


/**Type para TS
 * Documente le permite heredar todas la caracteristicas de Document
 */
export type ProjectType = Document & { 
   projectName: string;
   clientName: string;
   description: string;
};

/**Schema para Mongoose */
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }
});

  const Project = mongoose.model<ProjectType>("Project", ProjectSchema); // Se agrega modelo a la instancia de mongoose
  export default Project;