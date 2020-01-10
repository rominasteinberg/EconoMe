const nodemailer = require('nodemailer');


async function enviar(obj) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASSWORD
        },

        tls : {
            rejectUnauthorized: false
        }
    });
       
       const mailOptions = {
        from: process.env.USER_MAIL,
        to: process.env.USER_MAIL,
        subject: obj.asunto,
        html: `
        <strong>Nombre:</strong> ${obj.nombre} <br/>
        <strong>E-mail:</strong> ${obj.email} <br/>
        <strong>Mensaje:</strong> ${obj.mensaje}
        `
        };
       
       transporter.sendMail(mailOptions, function (err, info) {
        if (err)
        console.log(err)
        else
        console.log(info);
        });
}

module.exports = {enviar}