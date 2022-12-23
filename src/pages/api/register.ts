import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { prisma } from "../../server/db/client";

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { firstName, lastName, email, password, profileImage } = req.body;
  try {
    await prisma.user.create({
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
    res.status(422).json({ error: "User already exists =(" });
    return;
  }

  // const token = jwt.sign(
  //   {
  //     email: user.email,
  //     id: user.id,
  //     role: user.role,
  //     createdAt: Date.now(),
  //   },
  //   env.JWT_SECRET,
  //   { expiresIn: "8h" }
  // );

  // res.setHeader(
  //   "Set-Cookie",
  //   cookie.serialize(env.COOKIE_NAME, token, {
  //     httpOnly: true, // prevents JS access
  //     maxAge: 8 * 60 * 60, // milliseconds
  //     path: "/",
  //     sameSite: "lax",
  //     secure: process.env.NODE_ENV === "production",
  //   })
  // );

  res.status(201).json({
    success: true,
    message: "User created!",
  });
};

export default registerHandler;
