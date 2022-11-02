import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    res.json({ ...user });
  }
);
