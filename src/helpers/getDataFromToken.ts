import { NextRequest } from "next/server";
import jwt,{ JwtPayload } from 'jsonwebtoken';

export const getDataFromToken = (request:NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!) as PayerErrors as JwtPayload;
        
        return decodedToken.id

    }catch(error){
        if(error instanceof Error){
            throw new Error(error.message)
        }
    }
}