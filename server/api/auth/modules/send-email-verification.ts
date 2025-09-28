import fs from "fs";
import path from "path";

export async function sendEmailVerification(receiverEmail: string, otpCode: string) {
  const nodemailer = useNodeMailer();

  // Path to HTML file
  const templatePath = path.resolve("server/templates/email.html");

  // Load and parse the HTML file
  let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders
  htmlTemplate = htmlTemplate
    .replace("{{OTP_CODE}}", otpCode)
    .replace("{{YEAR}}", new Date().getFullYear().toString());

  return nodemailer.sendMail({
    to: receiverEmail,
    subject: "Verify Your Email Address",
    text: `Your verification code is: ${otpCode}`, // fallback
    html: htmlTemplate,
  });
}
