const nodemailer = require('nodemailer');
const openpgpEncrypt = require('nodemailer-openpgp').openpgpEncrypt;

const SMTP_HOST = 'smtp.kokull.com';
const SMTP_USER = 'noresponder@kokull.com';
const SMTP_PASS = '9Vs#79wr';

(async () => {

    let transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail',
        host: SMTP_HOST,
        port: 465,
        //port: 587,
        //port: 25,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        },
        tls: {
            rejectUnauthorized: true  // if on local
        }
    });

    transporter.use('stream', openpgpEncrypt());

    let info = await transporter.sendMail({
        from: 'noresponder@kokull.com', // sender address
        to: "djimenezseo@gmail.com", // list of receivers
        subject: "Correo de prueba desde local", // Subject line
        text: "El texto del correo de prueba", // plain text body
        html: "<h1>El html del email en cuestion</h1>", // html body
        encryptionKeys: ['123546789']
    });

    console.log("info => ", info);

})()

