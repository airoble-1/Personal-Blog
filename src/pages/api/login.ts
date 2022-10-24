import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { prisma } from "../../server/db/client";
import { env } from "../../env/server.mjs";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
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
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    console.log("Login sucessful");
    res.status(200).json({ Sucess: "Login sucessful" });
  } else {
    console.log("Login failed");
    res.status(401);
    res.json({ error: "Email or Password is wrong" });
  }
};

export default loginHandler;
