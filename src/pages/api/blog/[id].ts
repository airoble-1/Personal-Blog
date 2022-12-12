import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export default nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const blogId = +id;
    const blogs = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });
    res.json({ blogs });
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "update post" });
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "delete post" });
  });
