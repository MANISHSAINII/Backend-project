import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        
    const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log(`/n Mongoose Connected !! DB HOST : ${connectioninstance.connection.host}`)
        } catch (error) {
            console.log("mongoose connection error : ", error);
            process.exit(1);
    }
}

export default connectDB;