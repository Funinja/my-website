import { MongoClient } from 'mongodb';

const sleep = () => new Promise((resolve) => {
    setTimeout(()=>{
        resolve();
    }, 350);
})

async function handler(req, res) {

    if(req.method === 'POST'){
        const { email, captcha } = req.body;

        console.log(captcha);

        if(!email || !email.includes('@') || !captcha) {
            res.status(422).json({message: 'Invalid Email'});
            return;
        }

        try{
            console.log('Here')
            const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
            console.log(url);
            const response = await fetch(
                url,
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                  },
                  method: "POST",
                }
              );
            const captchaValidation = await response.json();

            console.log(captchaValidation);

            if(captchaValidation.success){
                console.log('Here3')
                await sleep();

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
                return res.status(422).json({
                    message: "Invalid Captcha"
                });
            }
        }catch (error) {
            console.log(error);
            return res.status(422).json({ message: "Other Error"});
        }

        
    }else{
        res.status(500).json({ message: 'Route not valid' });
    }

}

export default handler;