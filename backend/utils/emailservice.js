import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "akriti1220.be22@chitkara.edu.in",
    pass: "Akriti@mail1220",
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    console.log(`Attempting to send email to: ${to}`);
    console.log(`Email subject: ${subject}`);
    
    const mailOptions = {
      from: "akriti1220.be22@chitkara.edu.in",
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    if (error.code === 'EAUTH') {
      console.error("Authentication failed. Please check your email credentials.");
    } else if (error.code === 'ECONNECTION') {
      console.error("Connection error. Please check your internet connection.");
    }
    return false;
  }
};

export default sendEmail;
