async function sendEmailVerification(receiverEmail: string, otpCode: string) {
  const nodemailer = useNodeMailer();
  return nodemailer.sendMail({
    subject: "Email Verification",
    text: "Hello use this code to verify email your email address" + otpCode,
    to: receiverEmail,
  });
}
