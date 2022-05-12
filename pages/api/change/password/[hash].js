import { MongoClient } from 'mongodb';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
const bcrypt = require('bcryptjs');

const secret = process.env.TOKEN_SECRET;

export default async function ChangePassword(req, res){

    const hash = decodeURI(req.query.hash);

    const client = await MongoClient.connect(
        `${process.env.MONGO_URI}`,
        { useNewUrlParser: true, useUnifiedTopology: true}
    );

    const db = client.db();

    const duplicate = await db.collection('users').findOne({changedPassword: hash, registered: 1});

    if(duplicate){
        console.log(duplicate);
        const found = await db.collection('users').updateOne({
            changedPassword: hash, 
            registered: 1,
        }, {
            $set: {
                changedPassword: ''
            }
        });

        client.close();
        const token = sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            email: duplicate.email
        },
        secret
        )


        const serialised = serialize("CatJWT", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
        });

        res.setHeader("Set-Cookie", serialised);

        console.log(duplicate.email);
        
        res.writeHead(307, {Location : '/cat/pChanged'});
        return res.end();
    }

    client.close();
    return res.status(401).json({message: 'Cannot Change Password'});

}