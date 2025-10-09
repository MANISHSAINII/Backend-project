import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path : "./env"
})

connectDB();





/*import express from "express";
const app = express();

( async() => {
    try{
        mongoose.connect(` ${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("errro",  (error)=> {
            console.log("ERRR :", error)
            throw error 
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listning on the port ${process.env.PORT}`)
        })
    }
    catch (error) {
        console.error("Error : ", error)
        throw err
    }
})();
*/