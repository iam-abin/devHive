import jwt from "jsonwebtoken";

export const createJwtToken = (payload: {id:string,email: string,userType:string}) =>{
    
    const createdJwtToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY!,
        {
            expiresIn: "30d",
        }
    );

    return createdJwtToken
}