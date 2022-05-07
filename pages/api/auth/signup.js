import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

async function handler(req, res) {

    if(req.method === 'POST'){
        const { email, password } = req.body;

        if(!email || !email.includes('@') || !password) {
            res.status(422).json({message: 'Invalid Data'});
            return;
        }

        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`,
            { useNewUrlParser: true, useUnifiedTopology: true}
        );

        const db = client.db();

        const status = await db.collection('users').insertOne({
            email,
            password: await hash(password, 12),
        });

        res.status(201).json({ message: 'User created', ...status});
        client.close();
    }else{
        res.status(500).json({ message: 'Route not valid' });
    }

}

export default handler;