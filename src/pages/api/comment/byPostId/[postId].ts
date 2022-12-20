import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "../../../../server/db/client";
import { getToken } from "next-auth/jwt";

export default nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { postId } = req.query;
    const comments = await prisma.comment.findMany({
      where: {
        postId: +postId,
      },
    });
    res.json({ comments });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { postId } = req.query;
    const token = await getToken({ req });
    if (token) {
      const { body } = req.body;

      const comment = await prisma.comment.create({
        data: {
          body,
          author: { connect: { id: token.id as string } },
          post: { connect: { id: +postId } },
        },
      });
    } else {
      // Not Signed in
      res.status(401).json({
        success: false,
        message: "Not authorized!",
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: "blog created!",
    });
  });
