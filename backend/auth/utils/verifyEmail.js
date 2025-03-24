import nodemailer from "nodemailer";

export const verifyEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'ssl0.ovh.net', // Serveur SMTP OVH
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_TRIDISHOP,
        pass: process.env.PASSWORD_TRIDISHOP,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_TRIDISHOP,
      to: email,
      subject: "Vérification de votre compte",
      text: `Cliquez ici pour vérifier votre email : ${process.env.URL}/verify-email/${email}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
  }
};
