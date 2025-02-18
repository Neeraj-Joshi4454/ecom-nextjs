import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export const sendResetEmail = async (email, token) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  const message = {
    from: "your-email@example.com",
    to: email,
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: ${resetUrl}`,
    html: `<p>Click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
  };

  await transporter.sendMail(message);
};
