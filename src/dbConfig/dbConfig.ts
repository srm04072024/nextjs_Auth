import mongoose from "mongoose";
// database in other continent, So use async await
// no gureente in db connection , So use try catch

export async function connect(){
    try{
        // if (!process.env.MONOGO_URI) {
        //     throw new Error("Environment variable MONOGO_URI is not defined");
        // }
        mongoose.connect(process.env.MONOGO_URI!);
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('MongoDB connected.');
        })

        connection.on('error',(error)=>{
            console.log('MongoDB connection error: '+ error);
            process.exit();
        })

    }catch(error){
        console.log('Something went wrong in connecting to Database');
        console.log(error);
    }
}