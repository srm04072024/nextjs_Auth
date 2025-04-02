import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels"
import bcrypt from "bcryptjs";
import {NextRequest,NextResponse} from 'next/server'
import jwt from "jsonwebtoken"


connect()

export async function POST(request:NextRequest) {
    try{

        const reqBody = await request.json()
        const {email,password} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"user doesn't exist."},{status:400})
        }
        console.log("User Exist",user);

        const validPassword = await bcrypt.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error:"Check your credentials"},{status:400})
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        // here NestResponse is not directly returned because here we need send cookies with response
        // In EXPRESS Js we have to install extra library to access token but here next js provides by default
        const response =  NextResponse.json({message:"Logged In Success",success:true})

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;
    }catch(error){
        if(error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }
    }
}