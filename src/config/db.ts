import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process"

export const connectDB = async () => { // Conexion a DB
    try{
      const connection = await mongoose.connect(process.env.DATABASE_URL) // Conexion DB
      const url = `${connection.connection.host}: ${connection.connection.port}`;
      console.log(
         colors.bgGreen.bold(`MongoDB conectado en: ${url}`)
      );
    }catch(error){
       console.log(
          colors.bgRed.bold(`Error al conectar a MongoDB`)
       )
       exit(1)
    }
}