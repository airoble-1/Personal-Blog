import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getToken } from "next-auth/jwt";

export default nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const commentId = +id;
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
    res.json({ comment });
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    const { id } = req.query;
    const commentId = +id;
    const { reason, body } = req.body;
    try {
      await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          moderated: new Date(),
          moderatorId: token.id,
          moderatedBody: body,
          moderationType: reason,
        },
      });
      res.json({ message: "moderated comment" });
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;
    try {
      await prisma.comment.delete({
        where: {
          id: +id,
        },
      });
      res.json({
        success: true,
        message: "comment deleted",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error,
      });
    } finally {
      res.end();
    }
  });
