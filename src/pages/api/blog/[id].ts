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
    const { id } = req.query;
    console.log("Print");
    try {
      await prisma.blog.update({
        where: {
          id: +id,
        },
        data: req.body,
      });
      res.json({ message: "Blog has been updated" });
    } catch (error) {
      console.log(error);
      res.status(422).json({ error: "Unable to update blog" });
      return;
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "delete post" });
  });
