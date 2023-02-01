import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../server/db/client";
import bcrypt from "bcrypt";

export default nc().patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: token.id as string,
      },
    });
    if (user && bcrypt.compareSync(currentPassword, user.passwordHash)) {
      if (newPassword.length >= 8) {
        if (newPassword === confirmPassword) {
          await prisma.user.update({
            where: {
              id: token.id as string,
            },
            data: {
              passwordHash: bcrypt.hashSync(newPassword, 10),
            },
          });
        } else {
          res.json({ message: "Passwords do not match", error: true });
          return;
        }
      } else {
        res.json({
          message: "Password must be atleast 8 characters",
          error: true,
        });
        return;
      }
    } else {
      res.json({ message: "Current password incorrect", error: true });
      return;
    }
    res.json({ message: "User password changed", error: false });
    return;
  } catch (error) {
    console.log(error);
    res
      .status(422)
      .json({ message: "Error: Password could not be changed", error: true });
    return;
  }
});
