import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMPT_MAIL,
      password: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: "",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transpoter.sendMail(mailOptions);
};

export default sendEmail;
