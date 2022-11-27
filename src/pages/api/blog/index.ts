import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";

export default nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: " get all posts" });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    if (token?.role === "Administrator") {
      const { name, description, featureimage } = req.body;
      console.log("data: ", `${name}${description}${featureimage}`);

      const post = await prisma.blog.create({
        data: {
          name,
          description,
          featureimage,
          authorId: token.id as string,
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
      message: "post created!",
    });
  });
