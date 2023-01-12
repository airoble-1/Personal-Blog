import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../server/db/client";

export default nc().patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const { id } = req.query;

  try {
    await prisma.user.update({
      where: {
        id: id as string,
      },
      data: req.body,
    });
    res.json({ message: "user profile updated" });
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "Unable to edit user profile" });
    return;
  }
});
