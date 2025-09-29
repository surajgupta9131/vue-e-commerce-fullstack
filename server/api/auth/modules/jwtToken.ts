import jwt from "jsonwebtoken";

export function jwtPayload(userId: number) {
  const payload = {
    iss: "userName",
    sub: userId,
    aud: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 + 60 * 60,
    iat: Math.floor(Date.now() / 1000),
  };
  return payload;
}

export function signAccessToken(userId: number) {
  const payload = jwtPayload(userId);

  const key = process.env.JWT_TOKEN_KEY || "";
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, (error: any, token: any) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
}

export function signRefreshToken(userId: number) {
  const payload = jwtPayload(userId);
  const key = process.env.REFRESH_TOKEN_KEY || "";
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, (error: any, token: any) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
}
