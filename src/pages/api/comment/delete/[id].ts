import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getToken } from "next-auth/jwt";

export default nc().patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const { id } = req.query;
  const commentId = +id;
  const { deleted } = req.body;
  try {
    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        deleted,
        moderatorId: token.id,
      },
    });
    res.json({ message: "deleted comment" });
  } catch (error) {
    console.log(error);
  }
});
