const nodemailer = require('nodemailer');

async function sendEmail(obj) {
    try{
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

    let info = await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: obj.email_u,
        subject: obj.subject,
        html: obj.html
    });

    console.log('Message sent: %s', info.messageId);
    return info.messageId;
    }

    catch(error){
        throw(error);
    }
}

module.exports = {
    sendEmail
}
