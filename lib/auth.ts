import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../src/server/db/client";
import { env } from "../src/env/server.mjs";

// HOF wraps handlers and checks token
export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.BLOG_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, env.JWT_SECRET);
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error("User does not exist!");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorized" });
    return;
  };
};

export const validateToken = (token: string, secret = env.JWT_SECRET) => {
  const user = jwt.verify(token, secret);
  return user;
};
