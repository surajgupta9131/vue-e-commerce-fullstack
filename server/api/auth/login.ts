import prisma from "../../../utils/script.prisma";
import { comparePassword } from "./modules/bcrypt";
import { signInSchema } from "./modules/validateUsers";
import { signRefreshToken, signAccessToken } from "./modules/jwtToken";
import { USER_EMAIL_TYPE } from "./modules/user.constant";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const result = signInSchema.safeParse({ email, password });
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
      isValidEmail:USER_EMAIL_TYPE.VALID_EMAIL
    },
  });
  if (!userExist) {
    throw createError({
      statusCode: 422,
      message: "Email and Password invalid ",
    });
  }
  const isMatch = await comparePassword(password, userExist?.password);
  if (isMatch) {
    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(userExist?.id),
      signRefreshToken(userExist?.id),
    ]);
    const data = {
      token: {
        accessToken,
        refreshToken,
      },
      user: { name: userExist.name, email: userExist.email, id: userExist.id },
      isLoggedIn: true,
    };

    return {
      message: { message: "user loggedin successfully", data, redirect: true }, // info
    };
  } else {
    throw createError({
      statusCode: 422,
      message: "Email and Password invalid ",
    });
  }
});
