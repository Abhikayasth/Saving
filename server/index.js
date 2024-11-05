import dotenv from "dotenv";
import {app} from "./app.js"
import ConnectDB from "./db/index.js";

dotenv.config();
const PORT=process.env.PORT || 5000;

ConnectDB()
.then(() => {
    app.on("error",()=>{
        console.log(error);    
    })
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}
)
.catch((error) =>{
    console.log(error);
}
)
app.get("/",(req,res)=>{
    res.send("Hello World")
});