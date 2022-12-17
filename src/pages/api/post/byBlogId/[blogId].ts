import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "../../../../server/db/client";

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { blogId } = req.query;
  const posts = await prisma.post.findMany({
    where: {
      blogId: +blogId,
    },
  });
  res.json({ posts });
});
