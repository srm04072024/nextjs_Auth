import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels"
import {NextRequest,NextResponse} from 'next/server'

connect()

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);


        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gte:Date.now()}})
        
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        const verifiedUser = await user.save()
        console.log(verifiedUser)

        return NextResponse.json({message:"Email Verified successfully",success:true,verifiedUser},{status:200})
    
    }catch(error){
        if(error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }
    }
}