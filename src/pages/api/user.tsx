import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import { prisma } from "../../server/db/client";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    res.json({ ...user });
  }
);
