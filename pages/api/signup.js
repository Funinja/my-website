import { MongoClient } from 'mongodb';

const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

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

                const mailing = mailjet
                    .post("send", {'version':'v3.1'})
                    .request({
                        "Messages": [{
                            "From":{
                                "Email": "denwt.lam@outlook.com",
                                "Name": "Dennis Lam"
                            },
                            "To":[{
                                "Email": email,
                                "Name":"Customer"
                            }],
                            "Subject": "This is an email",
                            "TextPart":"This is the body of the email",
                            "HTMLPart": "<p>This is the body of the email</p>"
                        }]
                    })

                mailing
                    .then((result) => {
                        console.log(result.body)
                    })
                    .catch((err) => {
                        console.log(err.statusCode)
                    })

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
    
                // const status = await db.collection('users').insertOne({
                //     email,
                // });
    
                res.status(201).json({ message: 'Email Sent'});
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