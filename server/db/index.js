import mongoose from "mongoose"

const ConnectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected Successfully...!!! \n DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection ERROR: ", error);
        process.exit(1)
        // throw error
    }   
}

export default ConnectDB;