import { verify, decode } from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const secret = process.env.TOKEN_SECRET;

export default async function handler(req, res){

    const { cookies } = req;
    const { password } = req.body;
    const jwt = cookies.CatJWT;

    console.log(jwt, password);

    try{
        verify(jwt, secret);

        var decoded = decode(jwt);

        const client = await MongoClient.connect(`${process.env.MONGO_URI}`, 
        { useNewUrlParser: true, useUnifiedTopology: true}
        );

        const db = client.db();

        const duplicate = await db.collection('users').updateOne(
            {
                email : decoded.email
            },
            {
                $set : {
                    password: password
                }
            });

        client.close();

        return res.status(200).json({ message: "Successfully Changed Password"});

    }catch(error){
       
        return res.status(422).json({message: "An error has occured"});

    }

}