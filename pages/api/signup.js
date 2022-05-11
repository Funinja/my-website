import { MongoClient } from 'mongodb';
const bcrypt = require('bcryptjs');
const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const sleep = () => new Promise((resolve) => {
    setTimeout(()=>{
        resolve();
    }, 350);
})

async function handler(req, res) {

    if(req.method === 'POST'){
        const { email, captcha, password } = req.body;

        console.log(captcha);

        if(!email || !password || !email.includes('@') || !captcha) {
            res.status(422).json({message: 'Invalid Email'});
            return;
        }

        try{
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
                await sleep();

                const client = await MongoClient.connect(
                    `${process.env.MONGO_URI}`,
                    { useNewUrlParser: true, useUnifiedTopology: true}
                );
    
                const db = client.db();
    
                const duplicate = await db.collection('users').findOne({email:email});
                console.log(duplicate);
                
                if(duplicate){
                    console.log(duplicate.registered);
                    if(duplicate.registered==0){

                        let randomString  = (Math.random() + 1).toString(36).substring(2);

                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(randomString, salt);
                        hash = hash.replace(new RegExp("/", 'g'), '');
                        console.log("length", hash.length);

                        console.log("Substring:", randomString, "Hash:", hash);

                        const status = await db.collection('users').updateOne({
                            email,
                        }, {
                            $set: {
                                id:hash,
                                password:password
                            }
                        });

                        const encodedHash = encodeURI(hash);

                        console.log(encodedHash);

                        const URL = `${process.env.DOMAIN}api/activate/user/${encodedHash}`;

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
                                    "Subject": "Activate your account",
                                    "TextPart":`Activation URL: ${URL}`,
                                    "HTMLPart": `<p>Activation URL: <a href="${URL}">${URL}</a></p>`
                                }]
                            })

                        mailing
                            .then((result) => {
                                console.log(result.body)
                            })
                            .catch((err) => {
                                console.log(err.statusCode)
                            })

            
                        res.status(201).json({ message: 'Email Sent'});
                        client.close();
                        return;

                    }else{
                        res.status(422).json({ message: 'User Already Created'});
                        client.close();
                        return;
                    }
                }

                let randomString  = (Math.random() + 1).toString(36).substring(2);

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(randomString, salt);

                hash = hash.replace(new RegExp("/", 'g'), '');

                console.log("length", hash.length);

                console.log("Substring:", randomString, "Hash:", hash);

                const status = await db.collection('users').insertOne({
                    id : hash,
                    registered: 0,
                    changePassword: '',
                    email,
                    password, 
                });

                const encodedHash = encodeURI(hash);

                console.log(encodedHash);

                const URL = `${process.env.DOMAIN}api/activate/user/${encodedHash}`;

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
                            "Subject": "Activate your account",
                            "TextPart":`Activation URL: ${URL}`,
                            "HTMLPart": `<p>Activation URL: <a href="${URL}">${URL}</a></p>`
                        }]
                    })

                mailing
                    .then((result) => {
                        console.log(result.body)
                    })
                    .catch((err) => {
                        console.log(err.statusCode)
                    })

    
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