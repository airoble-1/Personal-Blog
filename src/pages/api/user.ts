import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";

export default validateRoute(async (_, res: NextApiResponse, user) => {
  res.json({ ...user });
});
