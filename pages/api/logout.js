import { serialize } from "cookie";

export default async function(req, res){
    const { cookies } = req;
    
    const jwt = cookies.CatJWT;

    if(!jwt){
        return res.status(422).json({ message: "You are not logged in..." });
    }else{
        const serialised = serialize("CatJWT", null, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        });

        res.setHeader("Set-Cookie", serialised);
        

        res.status(200).json({message: "Successfully logged out!"});
    }
}