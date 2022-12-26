import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const comments = await prisma.comment.findMany({
    where: {
      moderated: {
        not: null,
      },
    },
    orderBy: {
      moderated: "desc",
    },
    select: {
      body: true,
      moderated: true,
      moderatedBody: true,
      moderationType: true,
      moderator: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.json({ comments });
});
