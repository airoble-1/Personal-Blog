import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { prisma } from "../../server/db/client";
import { env } from "../../env/server.mjs";

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { firstName, lastName, email, password, profileImage } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        profileImage,
        email,
        passwordHash: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "User already exists" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      role: user.role,
      createdAt: Date.now(),
    },
    env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(env.COOKIE_NAME, token, {
      httpOnly: true, // prevents JS access
      maxAge: 8 * 60 * 60, // milliseconds
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
};

export default registerHandler;
