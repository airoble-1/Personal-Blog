import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../server/db/client";

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  try {
    if (token) {
      const user = await prisma.user.findFirst({
        where: {
          id: token.id,
        },
      });
      res.json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "Unable to retrieve user" });
    return;
  }
});
