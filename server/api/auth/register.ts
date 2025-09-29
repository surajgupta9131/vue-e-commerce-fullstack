import prisma from "../../../utils/script.prisma";
import { hashPassword } from "./modules/bcrypt";
import { generateOtp } from "./modules/generateOtpCode";
import { sendEmailVerification } from "./modules/send-email-verification";
import { USER_EMAIL_TYPE } from "./modules/user.constant";
import { signupSchema } from "./modules/validateUsers";


export default defineEventHandler(async (event) => {
  const { email,name, password } = await readBody(event);
  const result = signupSchema.safeParse({ email,name, password });
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "validation failed",
      data: result.error.flatten(),
    });
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExist) {
    throw createError({
      statusCode: 400,
      message: "This email is already been taken ",
    });
  }
  const hashPwd = await hashPassword(password);
  const otp = generateOtp();
  const user = await prisma.user.create({
    data: {
      name:name,
      email: email,
      password: hashPwd,
      isValidEmail: USER_EMAIL_TYPE.INVALID_EMAIL,
      otpCode: otp,
    },
  });

  await sendEmailVerification(email, otp);
  return {
    message: { message: "user created successfully", user,redirect:true },
  };
});
