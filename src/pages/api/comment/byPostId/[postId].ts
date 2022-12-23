import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "../../../../server/db/client";
import { getToken } from "next-auth/jwt";

export default nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { postId } = req.query;
    const comments = await prisma.comment.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        postId: +postId,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        moderator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.json({ comments });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { postId } = req.query;
    const token = await getToken({ req });
    if (token) {
      const { body } = req.body;

      await prisma.comment.create({
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
      message: "comment created!",
    });
  });
