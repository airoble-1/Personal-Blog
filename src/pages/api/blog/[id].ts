import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "get post" });
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "update post" });
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "delete post" });
  });
