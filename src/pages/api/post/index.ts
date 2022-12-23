import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";
import slugify from "slugify";

export default nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const posts = await prisma.post.findMany();
    res.json({ posts });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = await getToken({ req });
      if (token?.role === "Administrator") {
        const {
          blogId,
          title,
          abstract,
          content,
          featureImage,
          tags,
          readyStatus,
        } = req.body;

        await prisma.post.create({
          data: {
            blog: { connect: { id: +blogId } },
            title,
            abstract,
            content,
            featureImage,
            tags: {
              createMany: {
                data: tags?.map((tag) => ({
                  text: tag,
                  authorId: token.id as string,
                })),
              },
            },
            readyStatus,
            slug: slugify(title, { lower: true }),
            author: { connect: { id: token.id as string } },
          },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Not authorized!",
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: "post created!",
      });
    } catch (error) {
      res.status(422).json({ error: "Unable to create post =(" });
      return;
    }
  });
