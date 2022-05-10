import { verify } from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET;

export default function handler(req, res) {

    const { cookie } = req.body;
    const jwt = cookie;

    console.log("Getting Info", jwt);

    // console.log("Getting Info");

    try{
        verify(jwt, secret);

        return res.status(200).json({ name: 'Jane Smith' });
    }catch(error){
        return res.status(201).json({ name: 'John Doe', error: error });
    }

}