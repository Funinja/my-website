import { MongoClient } from 'mongodb';
const bcrypt = require('bcryptjs');

export default async function activateUser(req, res){

    const hash = decodeURI(req.query.hash);

    const client = await MongoClient.connect(
        `${process.env.MONGO_URI}`,
        { useNewUrlParser: true, useUnifiedTopology: true}
    );

    const db = client.db();

    const duplicate = await db.collection('users').findOne({id: hash, registered: 0});

    if(duplicate){
        console.log(duplicate);
        const found = await db.collection('users').updateOne({
            id: hash, 
        }, {
            $set: {
                registered : 1,
            }
        });

        client.close();
        res.writeHead(307, {Location : '/cat/accepted'});
        return res.end();
    }

    client.close();
    return res.status(401).json({message: 'Cannot Validate an User!'});

}