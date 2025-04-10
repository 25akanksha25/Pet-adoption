import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ananya1258.be22@chitkara.edu.in",
    pass: "Ananyagupta1258@",
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: "ananya1258.be22@chitkara.edu.in",
      to,
      subject,
      html,
    });
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export default sendEmail;
