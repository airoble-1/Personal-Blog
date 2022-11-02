import jwt, { JwtPayload } from "jsonwebtoken";
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
        const { id } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
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

interface myJWTPayload extends JwtPayload {
  email: string;
  id: string;
  role: string;
  createdAt: number;
}

export const validateToken = (
  token: string,
  secret: string = env.JWT_SECRET
): myJWTPayload => {
  const payload = jwt.verify(token, secret) as myJWTPayload;
  return payload;
};
