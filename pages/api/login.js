import { MongoClient } from 'mongodb';

const sleep = () => new Promise((resolve) => {
    setTimeout(()=>{
        resolve();
    }, 350);
})

async function handler(req,res){
    if(req.method === 'POST'){
        const { email, captcha, password } = req.body;

        if(!email || !password || !email.includes('@') || !captcha) {
            res.status(422).json({message: 'Invalid Email'});
            return;
        }

        try{

            const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;            

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
                await sleep();
                console.log("Here3");
                const client = await MongoClient.connect(
                    `${process.env.MONGO_URI}`,
                    { useNewUrlParser: true, useUnifiedTopology: true}
                );

                const db = client.db();

                console.log(password);

                const duplicate = await db.collection('users').findOne({
                    email:email,
                    password: password,
                });

                if (duplicate){



                    res.status(201).json({ message: 'Login Successful'});
                    client.close();
                    return;

                }else{
                    res.status(422).json({ message: 'No Such User'});
                    client.close();
                    return;
                }

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