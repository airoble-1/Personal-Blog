import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "../../../server/db/client";

export default nc().patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await prisma.post.update({
      where: {
        id: +id,
      },
      data: req.body,
    });
    res.json({ message: "Post has been updated" });
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "Unable to update post" });
    return;
  }
});
