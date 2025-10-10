import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path : "./env"
})

connectDB()
.then( () => {
    app.listen( process.env.PORT || 8000 , () => {
        console.log(`server is running at port : ${process.env.PORT }`)
    })
})
.catch( (err) => {
    console.log("MONGO db connection failed !!! ", err); 
})





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