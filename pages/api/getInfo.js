import { verify, decode } from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const secret = process.env.TOKEN_SECRET;

export default async function handler(req, res) {

    const { cookie } = req.body;
    const jwt = cookie;

    console.log("Getting Info", jwt);

    // console.log("Getting Info");

    try{
        verify(jwt, secret);

        var decoded = decode(jwt);

        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`,
            { useNewUrlParser: true, useUnifiedTopology: true}
        );

        const db = client.db();

        const duplicate = await db.collection('users').findOne({
            email: decoded.email,
        });

        client.close();

        return res.status(200).json({ name: decoded.email, other: duplicate });
    }catch(error){
        console.log(error);
        return res.status(201).json({ name: 'Cheater', other: null });
    }

}