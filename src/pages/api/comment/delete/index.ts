import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const comments = await prisma.comment.findMany({
    where: {
      deleted: {
        not: null,
      },
    },
    orderBy: {
      deleted: "desc",
    },
    select: {
      body: true,
      deleted: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
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
});
