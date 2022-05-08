import { MongoClient } from 'mongodb';


async function handler(req, res) {

    if(req.method === 'POST'){
        const { email, password } = req.body;

        if(!email || !email.includes('@')) {
            res.status(422).json({message: 'Invalid Email'});
            return;
        }

        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`,
            { useNewUrlParser: true, useUnifiedTopology: true}
        );

        const db = client.db();

        const duplicate = await db.collection('users').findOne({email:email});
        console.log(duplicate);
        
        if(duplicate){
            console.log(duplicate);
            res.status(422).json({ message: 'User Already Created'});
            client.close();
            return;
        }

        const status = await db.collection('users').insertOne({
            email,
        });

        res.status(201).json({ message: 'User created', ...status});
        client.close();
    }else{
        res.status(500).json({ message: 'Route not valid' });
    }

}

export default handler;