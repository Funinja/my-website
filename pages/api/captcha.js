import fetch from "node-fetch";

const sleep = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 350);
});

export default async function handler(req, res){

    const { body, method } = req;

    const { email, captcha } = body;

    if (method === "POST") {
        
    }

}