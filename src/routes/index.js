const express = require('express')
const nodemailer = require('nodemailer')
const { google, Auth } = require('googleapis')
const router = express.Router();

router.post("/send-email", (req,res)=> {
    const {name, mail, number, msg}=req.body
    const contentHtml = `
    <h1> Formulario de nodemailer </h1>
    <ul>
        <li>Nombre: ${name}</li>
        <li>Email: ${mail}</li>
        <li>Celular: ${number}</li>
    <ul>
    <p>${msg}</p>
    `;

    const CLIENTD_ID = "257591833109-rgf31mhfp0908qittb22sqfurrdqub91.apps.googleusercontent.com"
    const CLIENT_SECRET = "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"
    const REDIRECT_URI = "https://developers.google.com/oauthplayground"
    const REFRESH_TOKEN = "1//04vYLxI7ApIGTCgYIARAAGAQSNwF-L9IrQ76fCED2NcarUIFo3OO1CwQNcD1BCOOtPqP1kEg4bQawhHUloxLD7Ur4FGVZVsso3bA"

    const oAuth2Client = new google.auth.OAuth2(
        CLIENTD_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

    async function sendMail() {
        try{
            const accessToken = await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type:"OAuth2",
                    user:"sutovi175@gmail.com",
                    clientId:CLIENTD_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken:REFRESH_TOKEN,
                    accessToken:accessToken
                },
            });
            const mailOptions = {
                 from:"Pagina web Nodemailer <sutovi175@gmail.com>",
                 to:"jimenezadamesluisangel@gmail.com",
                 subject:"Nodemailer prueba",
                 html:contentHtml,
            };

            const result = await transporter.sendMail(mailOptions)
            return result;
        }
        catch(err){
            console.log(err)
        }
    }
    sendMail()
        .then(result=> res.status(200).send('enviado'))
        .catch(error=> console.log(error.message))
})

module.exports = router
