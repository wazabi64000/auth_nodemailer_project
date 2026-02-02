import nodemailer from "nodemailer";

import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});




transporter.verify((err, success) => {
  if (err) console.error("Erreur SMTP ", err.message)
    else console.log('SMTP conncté')
 
})


export const sendVerificationMail = async (email, token) => {

    await transporter.sendMail({
        from: 'Authentification API  <your_brevo_email>',
        to: email,
        subject: 'Confirmez votre email',
        html: `<h2>   Bienvenue ${email} ! </h2>
        <p> Merci pour votre inscription , veuillez clique sur le lien ci-dessous pour vérifier cotre email:  </p> <br/>
        <a href="http://localhost:5000/api/auth/verify?token=${token}">Vérifier mon email</a>`
    })
}

