import mongoose from "mongoose";

export const connnectToMongoose = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    });
    console.log("Mongoose Connected Successfully");
    }
    catch(error){
        console.log(error)
    }
}
