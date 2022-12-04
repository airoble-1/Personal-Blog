import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { env } from "../../env/server.mjs";
const emailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, subject, message } = req.body;
  console;
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_SMTP_USER,
      pass: env.EMAIL_SMTP_PASS,
    },
  });
  try {
    await transporter.sendMail({
      from: email,
      to: env.EMAIL_SMTP_USER,
      subject: `${subject}`,
      html: `You have a contact form submission from Personal Blog...<br><br>
      ${message}<br><br>
      Regards,<br>
      ${name}<br>
      ${email}
      `,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }

  res
    .status(200)
    .json({ success: true, message: "Email submitted sucessfully" });
  return;
};

export default emailHandler;
