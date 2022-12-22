import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "../../../../server/db/client";

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const post = await prisma.post.findFirst({
    where: {
      slug: slug as string,
    },
  });
  res.json({ post });
});
